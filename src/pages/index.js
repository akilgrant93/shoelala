import { firebase } from "config"
import Head from "next/head"
import React, {useState, useEffect, useCallback, useRef} from 'react'
import ListItem from "../ListItem"
import Sidebar from "../Sidebar"
import NavBar from "../NavBar"
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { motion } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import { SET_CART } from "@/redux/reducers/cart"

const Home = ({ alertOnBottom }) => {
  const { cart } = useSelector((state => state))
  const dispatch = useDispatch()

  const [shoes, setShoes] = useState([])
  const [windowDimensions, setWindowDimensions] = useState(1);
  const [ selectedBrand, setSelectedBrand ] = useState(false)
  const [ lastVisibleDoc, setLastVisibleDoc ] = useState("");
  const [scrollTop, setScrollTop] = useState(0);
  const [ limit, setLimit ] = useState(20)
  const [ priceMinimum, setPriceMinimum ] = useState('')
  const [ priceMaximum, setPriceMaximum ] = useState('')
  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
      }
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren"
      }
    }
  };

  const categoryChange = (e) => {
    if(e.target.id === 'adidas'){
      if(selectedBrand !== 'adidas'){setSelectedBrand('adidas')}
      else{setSelectedBrand(false)}
    } else if (e.target.id === 'nike'){
      if(selectedBrand !== 'nike'){setSelectedBrand('nike')}
      else{setSelectedBrand(false)}
    } else if (e.target.id === 'jordan'){
      if(selectedBrand !== 'jordan'){setSelectedBrand('jordan')}
      else{setSelectedBrand(false)}
    }
  };

  const itemAmountChange = (e) => {
    if(e.target.id === '20'){
      setLimit(20)
    } else if (e.target.id === '40'){
      setLimit(40)
    } else if (e.target.id === '100'){
      setLimit(100)
    }
  };

  const minimumChange = (e) => {
    setPriceMinimum(e.target.value)
  }

  const maximumChange = (e) => {
    setPriceMaximum(e.target.value)
  }

  const handleOnDocumentBottom = () => {
    if(shoes.length % 20 === 0){
      getNextShoes()
    }
  };

  const handleContainerOnBottom = useCallback(() => {
    if (alertOnBottom) {
      alert('Bottom of this container hit!');
    }
  }, [alertOnBottom]);

    /* This will trigger handleOnDocumentBottom when the body of the page hits the bottom */
    useBottomScrollListener(handleOnDocumentBottom);

    /* This will trigger handleOnContainerBottom when the container that is passed the ref hits the bottom */
    const containerRef = useBottomScrollListener(handleContainerOnBottom);

  useEffect(() => {

    let shoesRef

    const handleScroll = event => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);


    if(selectedBrand !== false && selectedBrand !== 'jordan'){
      shoesRef = firebase.firestore().collection('shoes').where('category', '==', selectedBrand[0].toUpperCase()+selectedBrand.slice(1)).orderBy('price')
    } else if(selectedBrand !== false && selectedBrand === 'jordan'){
      shoesRef = firebase.firestore().collection('shoes').where('category', '==', 'Air Jordan').orderBy('price')
    } else {
      shoesRef = firebase.firestore().collection('shoes').orderBy('price').where('price', '>=', priceMinimum === '' ? 0 : parseInt(priceMinimum))
      .where('price', '<=', priceMaximum === '' ? 1000 : parseInt(priceMaximum) )

    }

    shoesRef
    .limit(limit)
    .onSnapshot(
      querySnapshot => {
        const shoesArr = []
        querySnapshot.forEach((shoe) => {
          shoesArr.push({...shoe.data(), id: shoe.id})
        })
        setShoes(shoesArr)
        setLastVisibleDoc(shoesArr[shoesArr.length-1])
      }
    )

    if(firebase.auth().currentUser){
      const cartRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('cart')

      cartRef
      .onSnapshot(
        querySnapshot => {
          const cartObj = {}
          let subtotal = 0
          querySnapshot.forEach((item) => {
            cartObj[item.id] = {...item.data()}
            subtotal = subtotal + item.data().price * item.data().qty
          })
          dispatch(SET_CART(cartObj))
        }
        )
      }

    function handleResize() {
      setWindowDimensions({width:window.innerWidth, height:window.innerHeight});
    }

    handleResize()

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
    }, [selectedBrand, limit, priceMaximum, priceMinimum, dispatch])

    const getNextShoes = () => {
      let shoesRef
    if(selectedBrand !== false && selectedBrand !== 'jordan'){
      shoesRef = firebase.firestore().collection('shoes').where('category', '==', selectedBrand[0].toUpperCase()+selectedBrand.slice(1))
      .orderBy('title')
    } else if(selectedBrand !== false && selectedBrand === 'jordan'){
      shoesRef = firebase.firestore().collection('shoes').where('category', '==', 'Air Jordan')
      .orderBy('title')
    } else {
      shoesRef = firebase.firestore().collection('shoes').orderBy('price').where('price', '>=', priceMinimum === '' ? 0 : parseInt(priceMinimum))
      .where('price', '<=', priceMaximum === '' ? 1000 : parseInt(priceMaximum))

    }

    shoesRef
    .limit(limit)
    .startAfter(lastVisibleDoc.price)
    .onSnapshot(
      querySnapshot => {
        const shoesArr = []
        querySnapshot.forEach((shoe) => {
          shoesArr.push({...shoe.data(), id: shoe.id})
        })
        setShoes([...shoes,...shoesArr])
        setLastVisibleDoc(shoesArr[shoesArr.length-1])
      }
      )
    }

    const synposisStyle01 = {
      backgroundColor:'rgba(255,255,255,.75)', width: '300%', marginLeft: '-100%'
    };
    const synposisStyle02 = {
      backgroundColor:'rgba(255,255,255,.75)'
    };

  return (
    <div className="w-fit">
      <Head>
        <title>Shoelala</title>
        <meta name="description" content="All Products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='box' ref={containerRef}>
        <NavBar windowDimensions={windowDimensions}/>
        <div className="py-20 px-60 mx-auto"
        style={{
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',backgroundImage: "url(/pexels-erik-mclean-7543637.jpg)" }}>
        <div style={windowDimensions.width < 1024 ? synposisStyle01 : synposisStyle02} className='rounded-md shadow-lg p-5 lg:my-16'>
        <p className='text-center font-bold pb-5 text-xl'> SHOP ALL SNEAKERS</p>
        <p className='text-center text-xs'>The vault goes deep at Shoelala. Shop for new releases from must-have names like Nike, Nike, New Balance and Yeezy, along with the latest collaborations from brands like Vans, Reebok, Converse, ASICS, and more.</p>
        </div>
        </div>

        <div style={{boxShadow: '0px -2px 5px rgba(0,0,0,.5)'}} className="flex flex-col lg:flex-row pt-5 pb-20 w-full bg-slate-100">
        <Sidebar windowDimensions={windowDimensions} priceMaximum={priceMaximum} maximumChange={maximumChange} priceMinimum={priceMinimum} minimumChange={minimumChange} itemAmountChange={itemAmountChange} selectedBrand={selectedBrand} limit={limit} categoryChange={categoryChange}/>
        <div>
<motion.ul
    style={windowDimensions.width < 1024 ? {justifyContent:'center'} : null}
    className='flex flex-wrap pb-10 lg:pr-20 max-h-8/10'
    variants={list}
    initial="hidden"
    animate="visible"
  >

{shoes.map((shoe, index) => {
            return (<ListItem windowDimensions={windowDimensions} key={index} index={index} shoe={shoe}/>)
          })}
  </motion.ul>
        </div>
        </div>
      </main>
    </div>
  )
}

export default Home

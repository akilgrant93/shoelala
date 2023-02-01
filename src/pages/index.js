import { firebase } from "config"
import Head from "next/head"
import React, {useState, useEffect, useCallback} from 'react'
import ListItem from "./ListItem"
import Sidebar from "./Sidebar"
import NavBar from "./NavBar"
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { motion } from "framer-motion"

const Home = ({ alertOnBottom }) => {
  const [shoes, setShoes] = useState([])
  const [ selectedBrand, setSelectedBrand ] = useState(false)
  const [ firstEntry, setFirstEntry ] = useState('')
  const [ firstVisibleDoc, setFirstVisibleDoc ] = useState("");
  const [ lastVisibleDoc, setLastVisibleDoc ] = useState("");
  const [loadMore, setLoadMore] = useState(false);//certain actions are performed in useFirestore.jsx in order to make loadMore properly work
  const [scrollTop, setScrollTop] = useState(0);
  const [ isAdidas, setIsAdidas ] = useState(false)
  const [ isNike, setIsNike ] = useState(false)
  const [ isJordan, setIsJordan ] = useState(false)
  const [ is20, setIs20 ] = useState(true)
  const [ is40, setIs40 ] = useState(false)
  const [ is100, setIs100 ] = useState(false)
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
      setIsAdidas(!isAdidas)
      if(selectedBrand !== 'adidas'){setSelectedBrand('adidas')}
      if(selectedBrand === 'adidas'){setSelectedBrand(false)}

      if(isJordan){setIsJordan(!isJordan)}
      if(isNike){setIsNike(!isNike)}
    } else if (e.target.id === 'nike'){
      setIsNike(!isNike)
      if(selectedBrand !== 'nike'){setSelectedBrand('nike')}
      if(selectedBrand === 'nike'){setSelectedBrand(false)}

      if(isAdidas){setIsAdidas(!isAdidas)}
      if(isJordan){setIsJordan(!isJordan)}
    } else if (e.target.id === 'jordan'){
      setIsJordan(!isJordan)
      if(selectedBrand !== 'jordan'){setSelectedBrand('jordan')}
      if(selectedBrand === 'jordan'){setSelectedBrand(false)}

      if(isNike){setIsNike(!isNike)}
      if(isAdidas){setIsAdidas(!isAdidas)}
    }
  };

  const itemAmountChange = (e) => {
    if(e.target.id === '20'){
      setIs20(!is20)
      setLimit(20)
      if(is40){setIs40(!is40)}
      if(is100){setIs100(!is100)}
    } else if (e.target.id === '40'){
      setIs40(!is40)
      setLimit(40)
      if(is20){setIs20(!is20)}
      if(is100){setIs100(!is100)}
    } else if (e.target.id === '100'){
      setIs100(!is100)
      setLimit(100)
      if(is20){setIs20(!is20)}
      if(is40){setIs40(!is40)}
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
        setFirstEntry(shoesArr[0])
        setFirstVisibleDoc(shoesArr[0])
        setLastVisibleDoc(shoesArr[shoesArr.length-1])
      }
    )

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };


    }, [selectedBrand, limit, priceMaximum, priceMinimum])

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
        setFirstVisibleDoc(shoesArr[0])
        setLastVisibleDoc(shoesArr[shoesArr.length-1])
      }
      )
    }

  return (
    <div>
      <Head>
        <title>All Products</title>
        <meta name="description" content="All Products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='box' ref={containerRef}>
        <NavBar />
        <div className="py-20 px-60 mx-auto"
        style={{
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',backgroundImage: "url(/pexels-erik-mclean-7543637.jpg)" }}>
        <div style={{backgroundColor:'rgba(255,255,255,.75)'}} className='rounded-md shadow-lg p-5 mt-16'>
        <p className='text-center font-bold pb-5 text-xl'> SHOP ALL SNEAKERS</p>
        <p className='text-center text-xs'>The vault goes deep at Shoelala. Shop for new releases from must-have names like Nike, Nike, New Balance and Yeezy, along with the latest collaborations from brands like Vans, Reebok, Converse, ASICS, and more.</p>
        </div>
        </div>

        <div className="flex pt-5 pb-20 w-full bg-slate-100">
        <Sidebar priceMaximum={priceMaximum} maximumChange={maximumChange} priceMinimum={priceMinimum} minimumChange={minimumChange} itemAmountChange={itemAmountChange} is20={is20} is40={is40} is100={is100} isNike={isNike} isJordan={isJordan} isAdidas={isAdidas} categoryChange={categoryChange}/>
        <div>
        {/* <motion.ul animate='hidden' variants={list} className='flex flex-wrap pb-10 pr-20 max-h-8/10'>
          {shoes.map((shoe, index) => {
            return (<ListItem key={index} index={index} shoe={shoe}/>)
          })}
        </motion.ul> */}
<motion.ul
    className='flex flex-wrap pb-10 pr-20 max-h-8/10'
    variants={list}
    initial="hidden"
    animate="visible"
  >

{shoes.map((shoe, index) => {
            return (<ListItem key={index} index={index} shoe={shoe}/>)
          })}
  </motion.ul>
        </div>
        </div>
      </main>
    </div>
  )
}

export default Home

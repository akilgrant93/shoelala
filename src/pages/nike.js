import { firebase } from "config"
import Head from "next/head"
import React, {useState, useEffect, useCallback, useRef} from 'react'
import ListItem from "../ListItem"
import NavBar from "../NavBar"
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { motion } from "framer-motion"

export default function Nike({ alertOnBottom }) {
  const [shoes, setShoes] = useState([])
  const [windowDimensions, setWindowDimensions] = useState(1);
  const [ lastVisibleDoc, setLastVisibleDoc ] = useState("");
  const [scrollTop, setScrollTop] = useState(0);

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
    const handleScroll = event => {
      setScrollTop(window.scrollY);
  };

    window.addEventListener('scroll', handleScroll);

    let shoesRef = firebase.firestore().collection('shoes').where('category', '==', 'Nike')
    .orderBy('title')


    shoesRef
    .limit(20)
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

    function handleResize() {
      setWindowDimensions({width:window.innerWidth, height:window.innerHeight});
    }

    handleResize()

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };

    }, [])
    const getNextShoes = () => {
      let shoesRef = firebase.firestore().collection('shoes').where('category', '==', 'Air Nike')
      .orderBy('title')

    shoesRef
    .limit(20)
    .startAfter(lastVisibleDoc.title)
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
        <title>Nikes</title>
        <meta name="description" content="All Products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='box' ref={containerRef}>
      <NavBar windowDimensions={windowDimensions}/>
        <div className="py-20 px-60 mx-auto"
        style={{
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',backgroundImage: "url(/pexels-melvin-buezo-2529157.jpg)" }}>
        <div style={windowDimensions.width < 1024 ? synposisStyle01 : synposisStyle02}  className='rounded-md shadow-lg p-5 mt-16'>
        <p className='text-center font-bold pb-5 text-xl'> SHOP NIKES</p>
        <p className='text-center text-xs'>The vault goes deep at Shoelala. Shop for new releases from must-have names like Adidas, Nike, New Balance and Yeezy, along with the latest collaborations from brands like Vans, Reebok, Converse, ASICS, and more.</p>
        </div>
        </div>
        <div className="flex pt-5 pb-20 w-full bg-slate-100">
<motion.ul
    style={windowDimensions.width < 1024 ? {justifyContent:'center'} : null}
    className='flex justify-center flex-wrap pb-10 max-h-8/10'
    variants={list}
    initial="hidden"
    animate="visible"
  >
{shoes.map((shoe, index) => {
            return (<ListItem windowDimensions={windowDimensions} key={index} index={index} shoe={shoe}/>)
          })}
  </motion.ul>
        </div>
      </main>
    </div>
  )
}


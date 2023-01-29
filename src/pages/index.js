import { firebase } from "config"
import Head from "next/head"
import React, {useState,useEffect,useRef} from 'react'
import ListItem from "./ListItem"
import Sidebar from "./Sidebar"

const Home = () => {
  const [shoes, setShoes] = useState([])
  const [ selectedBrand, setSelectedBrand ] = useState(null)
  const [ isChecked, setIsChecked ] = useState(false)
  const [ isAdidas, setIsAdidas ] = useState(false)
  const [ isNike, setIsNike ] = useState(false)
  const [ isJordan, setIsJordan ] = useState(false)
  const [ limit, setLimit ] = useState(20)
  const [ priceMinimum, setPriceMinimum ] = useState(null)
  const [ priceMaximum, setPriceMaximum ] = useState(null)

  const shoesRef = firebase.firestore().collection('shoes').orderBy('title')

  const handleOnChange = (e) => {
    if(e.target.id === 'adidas'){
      setIsAdidas(!isAdidas)
      if(isJordan){setIsJordan(!isJordan)}
      if(isNike){setIsNike(!isNike)}
    } else if (e.target.id === 'nike'){
      setIsNike(!isNike)
      if(isAdidas){setIsAdidas(!isAdidas)}
      if(isJordan){setIsJordan(!isJordan)}
    } else if (e.target.id === 'jordan'){
      setIsJordan(!isJordan)
      if(isNike){setIsNike(!isNike)}
      if(isAdidas){setIsAdidas(!isAdidas)}
    }
    // setIsChecked(!isChecked)
    // setSelectedBrand(e.target.id)
  };


  useEffect(() => {
    shoesRef
    .limit(limit)
    .onSnapshot(
      querySnapshot => {
        const shoesArr = []
        querySnapshot.forEach((shoe) => {
          shoesArr.push({...shoe.data(), id: shoe.id})
        })
        setShoes(shoesArr)
      }
    )
    })

  return (
    <div>
      <Head>
        <title>All Products</title>
        <meta name="description" content="All Products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <div className="py-20 px-60 mx-auto">
        <p className='text-center font-bold py-5 text-xl'> SHOP ALL SNEAKERS</p>
        <p className='text-center text-xs'>The vault goes deep at Shoelala. Shop for new releases from must-have names like Air Jordan, Nike, New Balance and Yeezy, along with the latest collaborations from brands like Vans, Reebok, Converse, ASICS, and more. </p>
        </div>
        <div className="flex bg-slate-100 pt-5">
        <Sidebar isNike={isNike} isJordan={isJordan} isAdidas={isAdidas} handleOnChange={handleOnChange}/>
        <div>
        <p className='pb-5 font-semibold'>Results</p>

        <ul className='flex flex-wrap pb-10 pr-20'>
          {shoes.map((shoe, index) => {
            // console.log(shoe)
            return (<ListItem key={index} index={index} shoe={shoe}/>)
          })}
        </ul>
        </div>
        </div>
      </main>
    </div>
  )
}

export default Home

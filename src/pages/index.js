import { firebase } from "config"
import Head from "next/head"
import React, {useState,useEffect,useRef} from 'react'
import ListItem from "./ListItem"
import Sidebar from "./Sidebar"

const Home = () => {
  const [shoes, setShoes] = useState([])
  const [ selectedBrand, setSelectedBrand ] = useState(false)
  // const [ isChecked, setIsChecked ] = useState(false)
  const [ isAdidas, setIsAdidas ] = useState(false)
  const [ isNike, setIsNike ] = useState(false)
  const [ isJordan, setIsJordan ] = useState(false)
  const [ is20, setIs20 ] = useState(true)
  const [ is40, setIs40 ] = useState(false)
  const [ is100, setIs100 ] = useState(false)
  const [ limit, setLimit ] = useState(20)
  const [ priceMinimum, setPriceMinimum ] = useState(0)
  const [ priceMaximum, setPriceMaximum ] = useState(null)

  // const shoesRef = firebase.firestore().collection('shoes').where('category', '!=', false).orderBy('category', 'desc')

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


  useEffect(() => {
    let shoesRef

    if(selectedBrand !== false && selectedBrand !== 'jordan'){
      shoesRef = firebase.firestore().collection('shoes').where('category', '==', selectedBrand[0].toUpperCase()+selectedBrand.slice(1))
    } else if(selectedBrand !== false && selectedBrand === 'jordan'){
      shoesRef = firebase.firestore().collection('shoes').where('category', '==', 'Air Jordan')
    } else {
      shoesRef = firebase.firestore().collection('shoes').where('category', '!=', false).orderBy('category','desc')
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

      <main>
        <div className="py-20 px-60 mx-auto">
        <p className='text-center font-bold py-5 text-xl'> SHOP ALL SNEAKERS</p>
        <p className='text-center text-xs'>The vault goes deep at Shoelala. Shop for new releases from must-have names like Air Jordan, Nike, New Balance and Yeezy, along with the latest collaborations from brands like Vans, Reebok, Converse, ASICS, and more. </p>
        </div>
        <div className="flex pt-5 w-full  bg-slate-100">
        <Sidebar itemAmountChange={itemAmountChange} is20={is20} is40={is40} is100={is100} isNike={isNike} isJordan={isJordan} isAdidas={isAdidas} categoryChange={categoryChange}/>
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

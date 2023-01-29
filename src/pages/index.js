import { firebase } from "config"
import Head from "next/head"
import React, {useState,useEffect,useRef} from 'react'
import ListItem from "./ListItem"
import Sidebar from "./Sidebar"

const Home = () => {
  const [shoes, setShoes] = useState([])
  const [ selectedBrand, setSelectedBrand ] = useState(null)
  const [ limit, setLimit ] = useState(20)
  const [ priceMinimum, setPriceMinimum ] = useState(null)
  const [ priceMaximum, setPriceMaximum ] = useState(null)

  const shoesRef = firebase.firestore().collection('shoes').orderBy('title')

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
        <Sidebar />
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

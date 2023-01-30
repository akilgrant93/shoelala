import { firebase } from 'config'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {useState, useEffect} from 'react'
import NavBar from '../NavBar'


const Shoe = () => {
  const [shoe, setShoe] = useState([])
  const router = useRouter()
  useEffect(() => {
    let shoeRef = firebase.firestore().collection('shoes').where('title', '==', `${router.query.id}`)

    shoeRef
    .limit(1)
    .onSnapshot(
      querySnapshot => {
        const shoesArr = []
        querySnapshot.forEach((shoe) => {
          shoesArr.push({...shoe.data(), id: shoe.id})
        })
        setShoe(shoesArr[0])
      }
    )


  }, [])

  return <div>
    <Head>
        <title>{shoe.title}</title>
        <meta name={shoe.title} content={shoe.title} />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <NavBar />
    <div style={{marginTop: 150, display:'flex'}}>
      <div className='w-1/2 p-10 text-sm'>
        <div style={{display:'flex', justifyContent:'center'}}>
          <p>Shoelala</p><p>/</p><p>{shoe.category}</p><p>/</p>
        </div>
        <p style={{textAlign:'center'}}>{shoe.title}</p>
        <img src={shoe.image} alt={shoe.title}/>
      </div>
      <div className='w-1/2 p-10'>
      <p className='text-xs'>{shoe.category}</p>
      <p className='text-xl font-bold break-words my-5'>{shoe.title}</p>
      <p className='font-semibold break-words mb-5' style={{fontSize:14}}>SELECT SIZE</p>
      <div style={{display: 'grid', gap: '5px', gridTemplateColumns: 'repeat(5, 1fr)'}}> {[3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,14.5,15].map((size, idx) => {
        return <button className='border border-slate-200 hover:border-black py-3'>{size}</button>
      })}
      </div>
      <div className='flex justify-center flex-col'>
      <p className='pt-6 pb-3 text-sm font-semibold text-center'>ADD TO CART</p>
      <p className='py-3 w-1/3 text-white px-5 bg-red-700 font-bold text-center self-center' >${shoe.price}</p>
      </div>
      </div>
    </div>
    </div>
}

export default Shoe

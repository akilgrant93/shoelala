import { firebase } from 'config'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {useState, useEffect} from 'react'
import NavBar from '../NavBar'


const Shoe = () => {
  const [ shoe, setShoe ] = useState([])
  const [ cart, setCart ] = useState([])
  const [ selectedSize, setSelectedSize ] = useState(null)
  const router = useRouter()

  const handleChange = (e) => {
    setSelectedSize(e.target.innerText)
  }

  const addToCart = async () => {
    if(selectedSize === null){
      alert('Select a size!')
    }else {
      //if there is no user create a user
      if(!firebase.auth().currentUser){
      firebase.auth().signInAnonymously()
      .then(() => {

        const cartRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('cart')

        const shoeRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('cart').where('title', '==', `${shoe.title}`)

        const newUserCartItem = cartRef.doc(shoe.title)

        const currShoe = []
        shoeRef
          .limit(1)
          .onSnapshot(
            querySnapshot => {
              let cartItemData
              querySnapshot.forEach((shoe) => {
                currShoe.push({...shoe.data(), id: shoe.id})
              })


              cartItemData = {
                ...shoe, qty:1, size:selectedSize, id:newUserCartItem.id
              }

            newUserCartItem
            .set(cartItemData)
          }
          )

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
      }
      //if there is a user
      else {
        const cartRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('cart')

        const shoeRef = await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('cart').where('title', '==', `${shoe.title}`).get()

        //if there is a shoe in the cart update it
        //this function will need to be tweaked to accomodate adding multiple copies of the same shoe, but of different sizes to the cart
        shoeRef.forEach(shoe => {
                const docRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('cart').doc(shoe.id)
                docRef.update({qty: shoe.data().qty+1});
        })

        if(shoeRef.empty){
          const newUserCartItem = cartRef.doc(shoe.title)
          const cartItemData = {
            ...shoe, qty:1, size:selectedSize, id:newUserCartItem.id
          }
          newUserCartItem
            .set(cartItemData)
        }
      }
    }
  }

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

   if(firebase.auth().currentUser){
    const cartRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('cart')

    cartRef
    .onSnapshot(
      querySnapshot => {
        const cartObj = {}
        querySnapshot.forEach((item) => {
          cartObj[item.id] = {...item.data()}
        })
        setCart(cartObj)
      }
      )

    }
  }, [router.query.id, cart])

  return <div>
    <Head>
        <title>{shoe.title}</title>
        <meta name={shoe.title} content={shoe.title} />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <NavBar />
    <div style={{marginTop: 150, display:'flex'}}>
      <div className='w-1/2 p-10 text-sm'>
        <div style={{display:'flex', justifyContent:'center'}} className='font-bold'>
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
        return <button key={idx} onClick={handleChange} className='border border-slate-200 hover:border-black py-3' style={selectedSize === size.toString() ? {borderColor:'black'} : null}>{size}</button>
      })}
      </div>
      <div className='flex justify-center flex-col'>
      <p className='pt-6 pb-3 text-sm font-semibold text-center'>ADD TO CART</p>
      <p onClick={addToCart} className='py-3 w-1/3 text-white px-5 bg-red-500 font-bold hover:bg-red-700 text-center self-center cursor-pointer' >${shoe.price}</p>
      </div>
      </div>
    </div>
    </div>
}

export default Shoe

import React, {useState, useEffect} from 'react'
import CartItem from './CartItem'
import { firebase } from 'config'

export default function Cart(props) {
  const [ cartObj, setCartObj ] = useState({}
  )
  const [ total, setTotal ] = useState(0)

  const changeQuantity = (e, data) => {
    console.log(e.target.value)
    const cart = cartObj
    if(e.target.value === '0'){
      delete cart[data.title]
    } else {
      cart[data.title].qty = e.target.value
    }
    setCartObj(cart)
  }

  useEffect(() => {
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
          setCartObj(cartObj)
          setTotal(subtotal)
          // console.log('cart obj',cartObj)
        }
        )

      }
  }, [])

  return (
    <div style={{zIndex:99, backgroundColor:'rgba(0,0,0,.5)', width: '100%', height: '100%', display:'flex', justifyContent:'center', alignItems:'center'}} className='fixed top-12'>
      <div className='p-10 bg-white w-80 h-3/5 rounded-xl flex flex-col justify-between shadow-lg'>

      <div className='h-full overflow-y-scroll'>
      <p className='text-sm font-bold pb-2' style={{borderBottomWidth: 1, borderBottomColor: 'black',}}>CART</p>
      {Object.entries(cartObj).length > 0 ? Object.entries(cartObj).map((item, idx) => {
        // console.log(item)
        return <CartItem changeQuantity={changeQuantity} key={idx} lastIdx={Object.entries(cartObj).length-1} item={item[1]}/>
      }
      ) : null }
      </div>

      {Object.entries(cartObj).length > 0 ? null : <p className='text-center'>Cart empty</p> }

    <p className='absolute py-1 px-3  rounded-lg bg-red-300 shadow-lg cursor-pointer'
    style={{marginTop:-47.5, marginLeft:255, color:'white '}}
    onClick={() => {
      props.setIsOpen(false)
    }}>X</p>

    <div>
      <div style={{borderTopWidth: 1, borderTopColor: 'black',}} className='flex justify-between'>
    <p className='text-sm font-bold py-2'>SUBTOTAL</p>
    <p className='text-sm font-bold py-2'>${total}</p>
      </div>
    <p style={{fontSize:10, textAlign:'end'}}>Tax included. Shipping calculated at checkout</p>
    </div>

      </div>
    </div>

  )
}

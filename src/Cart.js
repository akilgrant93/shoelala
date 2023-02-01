import React, {useState, useEffect} from 'react'
import CartItem from './CartItem'
import { firebase } from 'config'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { motion } from "framer-motion"
// import Link from 'next/link'

export default function Cart(props) {
  const [ cartObj, setCartObj ] = useState({}
  )
  const [ total, setTotal ] = useState(0)

  const list = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
      }
    },
    hidden: {
      opacity: 0,
      y: 50,
      transition: {
        when: "afterChildren"
      }
    }
  };

  const changeQuantity = (e, data) => {
    const shoeRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('cart').doc(data.title)

    let cart = cartObj
    if(e.target.value === '0'){
      delete cart[data.title]
      shoeRef.delete()
    } else {
      cart[data.title].qty = e.target.value
      shoeRef.update({qty: e.target.value})
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
        }
        )

      }
  }, [])

  return (
    <motion.div variants={list} initial='hidden' animate='visible' style={{zIndex:99, backgroundColor:'rgba(0,0,0,.5)', width: '100%', height: '100%', display:'flex', justifyContent:'center', alignItems:'center', position:'fixed', top: '3rem'}}>
      <div style={{padding:'2.5rem', backgroundColor:'white', display:'flex', flexDirection:'column', justifyContent:'space-between', borderRadius: 10, width:'20rem', height:'60%', boxShadow: '0px 0px 9px rgba(0,0,0,.5)'}} >

      <div style={{height:'100%', overflowY:'scroll'}}>
      <p style={{fontWeight: 'bold',fontSize: 10,paddingBottom: '.5rem', borderBottomWidth: 1, borderBottomColor: 'black',}}>CART</p>
      {Object.entries(cartObj).length > 0 ? Object.entries(cartObj).map((item, idx) => {
        return <CartItem changeQuantity={changeQuantity} key={idx} lastIdx={Object.entries(cartObj).length-1} item={item[1]}/>
      }
      ) : null }
      {Object.entries(cartObj).length > 0 ? null : <div style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}><AiOutlineShoppingCart size={45}/><p style={{textAlign:'center', fontSize:10, marginTop: '.5rem'}}>Your cart is empty</p></div> }
      </div>


    <p style={{position: 'absolute', paddingLeft: '.75rem', paddingRight: '.75rem', paddingBottom: '.25rem', paddingTop: '.25rem', marginTop:-47.5, marginLeft:252.5, color:'white', backgroundColor:'rgb(252 165 165)', borderRadius:5, boxShadow: '0px 0px 5px rgba(0,0,0,.5)'}} className='bg-red-300 cursor-pointer'
    onClick={() => {
      props.setIsOpen(false)
    }}>X</p>

    <div>
      <div style={{borderTopWidth: 1, borderTopColor: 'black', display:'flex', justifyContent:'space-between'}}>
    <p style={{paddingTop: '.5rem', paddingBlock: '.5rem'}} className='text-sm font-bold'>SUBTOTAL</p>
    <p style={{paddingTop: '.5rem', paddingBlock: '.5rem'}} className='text-sm font-bolds'>${total}</p>
      </div>
    <p style={{fontSize:10, textAlign:'center'}}>Taxes and shipping calculated at checkout</p>
    {/* <Link href="/checkout"> */}
      <p className='py-3 text-white px-5 bg-red-500 font-bold hover:bg-red-700 text-center self-center cursor-pointer mt-2 rounded-md'>CHECKOUT</p>
      {/* </Link> */}
    </div>

      </div>
    </motion.div>

  )
}

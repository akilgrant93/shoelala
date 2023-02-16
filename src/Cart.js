import React, {useState, useEffect} from 'react'
import CartItem from './CartItem'
import { firebase } from 'config'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { motion } from "framer-motion"
// import Link from 'next/link'
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";
import { useSelector, useDispatch } from "react-redux"
import { SET_CART } from "@/redux/reducers/cart"
import toast, { Toaster } from 'react-hot-toast';

export default function Cart(props) {
  const { cart } = useSelector((state => state))
  const {name} = useSelector((state => state.profile))
  const dispatch = useDispatch()
  const [ total, setTotal ] = useState(0)
  const [ loading, setLoading ] = useState(true)

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

  const cartStyle01 = {padding:'2.5rem', backgroundColor:'white', display:'flex', flexDirection:'column', justifyContent:'space-between', borderRadius: 10, width:'30rem', height:'65%'}

  const cartStyle02 = {padding:'2.5rem', backgroundColor:'white', display:'flex', flexDirection:'column', justifyContent:'space-between', borderRadius: 10, width:'20rem', height:'60%'}

  const bgStyle01 = {zIndex:99, backgroundColor:'rgba(0,0,0,.5)', width: '100%', height: '100%', display:'flex', justifyContent:'center', alignItems:'center', position:'fixed', top: 0}

  const bgStyle02 = {zIndex:99, backgroundColor:'rgba(0,0,0,.5)', width: '100%', height: '100%', display:'flex', justifyContent:'center', alignItems:'center', position:'fixed', top: '3rem'}

  const cancelStyle01 = {position: 'absolute', paddingLeft: '.75rem', paddingRight: '.75rem', paddingBottom: '.25rem', paddingTop: '.25rem', marginTop:-47.5, marginLeft:412.5, color:'white', backgroundColor:'rgb(252 165 165)', borderRadius:5}

  const cancelStyle02 = {position: 'absolute', paddingLeft: '.75rem', paddingRight: '.75rem', paddingBottom: '.25rem', paddingTop: '.25rem', marginTop:-47.5, marginLeft:252.5, color:'white', backgroundColor:'rgb(252 165 165)', borderRadius:5}

  const changeQuantity = (e, data) => {
    const shoeRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('cart').doc(data.title)

    let cartObj = cart
    if(e.target.value === '0'){
      delete cartObj[data.title]
      shoeRef.delete()
    } else {
      shoeRef.update({qty: e.target.value})
    }
    dispatch(SET_CART(cartObj))
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
          dispatch(SET_CART(cartObj))
          setTotal(subtotal)
          setLoading(false)
        }
        )
      }
  }, [dispatch])

  const deleteEntry = (data) => {
    const shoeRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('cart').doc(data.title)
    shoeRef.delete()
    toast(`Removed from Cart`, {
      position: 'bottom-right',
      style: {
        background: 'rgb(185 28 28)',
        color: '#fff',
      },
      duration: 2000,
    });
  }

  return (
    <motion.div variants={list} initial='hidden' animate='visible' style={props.windowDimensions.width < 1024 ? bgStyle01 : bgStyle02}>

      <div style={props.windowDimensions.width < 1024 ? cartStyle01 : cartStyle02} className='shadow-lg'>

      <div
      style={{height:'100%',overflow: 'hidden',
    position: 'relative',}}
    >
      <p style={{fontWeight: 'bold',fontSize: 10,paddingBottom: '.5rem', borderBottomWidth: 1, borderBottomColor: 'black',}}>CART</p>
      {loading ? <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', fontSize: 10, marginTop: '30%', marginBottom:'5%'}}><Spinner /><p>Cart Loading</p></div> : null}
      <div
      style={{position: 'absolute', top: 25, left: 0, bottom: '-20px', right: '-20px', marginBottom: 20,paddingRight:'20px', overflow: 'scroll'}}
      >
      {Object.entries(cart.name).length > 0 ? Object.entries(cart.name).map((item, idx) => {
        return <CartItem deleteEntry={deleteEntry} changeQuantity={changeQuantity} idx={idx} key={idx} lastIdx={Object.entries(cart.name).length-1} item={item[1]}/>
      }
      ) : null }
      </div>
      {Object.entries(cart.name).length > 0 ? null : <div style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}><AiOutlineShoppingCart size={45}/><p style={{textAlign:'center', fontSize:10, marginTop: '.5rem'}}>Your cart is empty</p></div> }
      </div>


    <p style={props.windowDimensions.width < 1024 ? cancelStyle01 : cancelStyle02} className='cursor-pointer shadow-lg'
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
      <p onClick={() => {console.log('checkout attempt??????')}} className='py-3 text-white px-5 bg-red-500 font-bold hover:bg-red-700 text-center self-center cursor-pointer mt-2 rounded-md'>CHECKOUT</p>
      {/* </Link> */}
    </div>

      </div>
      <Toaster />
    </motion.div>

  )
}

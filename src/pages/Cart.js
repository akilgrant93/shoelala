import React, {useState} from 'react'
import CartItem from './CartItem'

export default function Cart(props) {
  const [ cartItems, setCartItems ] = useState([{category:'Air Jordan',price:420,image:'https://cdn.flightclub.com/750/TEMPLATE/011834/1.jpg?w=360',title:'Air Jordan 11 retro "gamma blue"'}])
  const [ subtotal, setSubtotal ] = useState(0)
  const [ quantity, setQuantity ] = useState(1)

  const changeQuantity = (e, data) => {
    console.log(e)
    console.log(data)
    setQuantity(e.target.value)
  }

  return (
    <div style={{zIndex:99, backgroundColor:'rgba(0,0,0,.5)', width: '100%', height: '100%', display:'flex', justifyContent:'center', alignItems:'center'}} className='fixed top-12'>
      <div className='p-10 bg-white w-80 h-3/5 rounded-xl flex flex-col justify-between shadow-lg'>

      <p className='text-sm font-bold pb-2' style={{borderBottomWidth: 1, borderBottomColor: 'black',}}>CART</p>
      {cartItems.length > 0 ? cartItems.map((item, idx) => {
        return <CartItem changeQuantity={changeQuantity} quantity={quantity} key={idx} item={item}/>
      }) : <p className='text-center'>Cart empty</p> }

    <p className='absolute py-1 px-3  rounded-lg bg-slate-100 shadow-lg cursor-pointer'
    style={{marginTop:-47.5, marginLeft:255}}
    onClick={() => {
      props.setIsOpen(false)
    }}>X</p>

    <div>
      <div style={{borderTopWidth: 1, borderTopColor: 'black',}} className='flex justify-between'>
    <p className='text-sm font-bold py-2'>SUBTOTAL</p>
    <p className='text-sm font-bold py-2'>${subtotal}</p>
      </div>
    <p style={{fontSize:10, textAlign:'end'}}>Tax included. Shipping calculated at checkout</p>
    </div>

      </div>
    </div>

  )
}

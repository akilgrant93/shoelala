import React, {useState} from 'react'
import CartItem from './CartItem'

export default function Cart(props) {
  const [ cartObj, setCartObj ] = useState({'Air Jordan 11 retro "gamma blue"':{category:'Air Jordan',price:420,image:'https://cdn.flightclub.com/750/TEMPLATE/011834/1.jpg?w=360',title:'Air Jordan 11 retro "gamma blue"', qty:1},
  'Air Jordan 11 retro "gamma red"':{category:'Air Jordan',price:420,image:'https://cdn.flightclub.com/750/TEMPLATE/011834/1.jpg?w=360',title:'Air Jordan 11 retro "gamma red"', qty:1}}
  )
  const [ subtotal, setSubtotal ] = useState(0)

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

  return (
    <div style={{zIndex:99, backgroundColor:'rgba(0,0,0,.5)', width: '100%', height: '100%', display:'flex', justifyContent:'center', alignItems:'center'}} className='fixed top-12'>
      <div className='p-10 bg-white w-80 h-3/5 rounded-xl flex flex-col justify-between shadow-lg'>

      <p className='text-sm font-bold pb-2' style={{borderBottomWidth: 1, borderBottomColor: 'black',}}>CART</p>
      {Object.entries(cartObj).length > 0 ? Object.entries(cartObj).map((item, idx) => {
        // console.log(Object.entries(cartObj).length)
        return <CartItem changeQuantity={changeQuantity} key={idx} item={item[1]}/>
      }
      ) : <p className='text-center'>Cart empty</p> }

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

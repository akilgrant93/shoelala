import React, {useState} from 'react'

export default function Cart(props) {
  const [ cartItems, setCartItems ] = useState([])
  const [ subtotal, setSubtotal ] = useState('0.00')

  return (
    <div style={{zIndex:99, backgroundColor:'rgba(0,0,0,.5)', width: '100%', height: '100%', display:'flex', justifyContent:'center', alignItems:'center'}} className='fixed top-12'>
      <div className='p-10 bg-white w-80 h-3/5 rounded-xl flex flex-col justify-between shadow-lg'>
      <p className='text-sm font-bold pb-2' style={{borderBottomWidth: 1, borderBottomColor: 'black',}}>CART</p>
    <p className='absolute py-1 px-3  rounded-lg bg-white shadow-lg cursor-pointer' style={{marginTop:'-3.75%', marginLeft:'19.75%'}} onClick={() => {
      props.setIsOpen(false)
    }}>X</p>
    <div>
      <div style={{borderTopWidth: 1, borderTopColor: 'black',}} className='flex justify-between'>
    <p className='text-sm font-bold py-2'>SUBTOTAL</p>
    <p className='text-sm font-bold py-2'>{subtotal}</p>
      </div>
    <p style={{fontSize:10, textAlign:'end'}}>Tax included. Shipping calculated at checkout</p>
    </div>

      </div>
    </div>

  )
}

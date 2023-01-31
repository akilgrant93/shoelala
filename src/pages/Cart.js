import React from 'react'

export default function Cart(props) {
  return (
    <div style={{zIndex:99, backgroundColor:'rgba(0,0,0,.5)', width: '100%', height: '100%', display:'flex', justifyContent:'center', alignItems:'center'}} className='fixed top-12'>
      <div style={{padding:10, backgroundColor:'white', borderRadius: 5}}>
      <p>Cart</p>
    <p onClick={() => {
      props.setIsOpen(false)
    }}>close</p>
      </div>
    </div>

  )
}

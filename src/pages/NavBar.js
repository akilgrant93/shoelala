import React from 'react'
import Link from 'next/link'

export default function NavBar() {
  return (
    <ul className='shadow-md py-2 justify-end pr-10 items-center' style={{position: 'fixed', top: 0, width: '100%', zIndex: 999, display:'flex', backgroundColor:'white'}}>
      <li className='font-semibold' style={{padding:5, marginRight: '25%'}}><Link href="/">SHOELALA</Link></li>
      <li className='font-semibold' style={{padding:5, fontSize:12}}><Link href="/">ALL</Link></li>
      <li className='font-semibold' style={{padding:5, fontSize:12}}><Link href="/jordan">JORDAN</Link></li>
      <li className='font-semibold' style={{padding:5, fontSize:12}}><Link href="/adidas">ADIDAS</Link></li>
      <li className='font-semibold' style={{padding:5, fontSize:12}}><Link href="/nike">NIKE</Link></li>
      <li className='font-semibold' style={{padding:5, fontSize:12}}><Link href="/cart">CART</Link></li>
      <li className='font-semibold' style={{padding:5, fontSize:12}}><Link href="/account">ACCOUNT</Link></li>
    </ul>
  )
}

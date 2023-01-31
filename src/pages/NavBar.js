import React, {useState} from 'react'
import Link from 'next/link'
import Cart from './Cart'

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
    <ul className='shadow-md py-2 justify-end pr-10 items-center' style={{position: 'fixed', top: 0, width: '100%', zIndex: 999, display:'flex', backgroundColor:'white'}}>
      <li className='font-semibold' style={{padding:5, marginRight: '25%'}}><Link href="/">SHOELALA</Link></li>
      <li className='font-semibold' style={{padding:5, fontSize:12}}><Link href="/">ALL</Link></li>
      <li className='font-semibold' style={{padding:5, fontSize:12}}><Link href="/jordan">JORDAN</Link></li>
      <li className='font-semibold' style={{padding:5, fontSize:12}}><Link href="/adidas">ADIDAS</Link></li>
      <li className='font-semibold' style={{padding:5, fontSize:12}}><Link href="/nike">NIKE</Link></li>
      <li className='font-semibold' onClick={() => {setIsOpen(true)}} style={{padding:5, fontSize:12}}>CART</li>
      <li className='font-semibold' style={{padding:5, fontSize:12}}><Link href="/account">ACCOUNT</Link></li>
    </ul>
      {isOpen && <Cart setIsOpen={setIsOpen} />}
    </div>
  )
}

import React, {useState} from 'react'
import Link from 'next/link'
import Cart from './Cart'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { SiJordan, SiNike, SiAdidas } from "react-icons/si";
export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
    <ul className='shadow-md' style={{position: 'fixed', top: 0, width: '100%', zIndex: 999, display:'flex', justifyContent:'space-between' ,backgroundColor:'white', alignItems:'center', paddingRight: 40, boxShadow: '0px 2px 5px rgba(0,0,0,.5)'}}>
      <li style={{padding:5, marginLeft: 40}}><Link href="/"><img style={{height: 35}} src={'/shoelala.png'} alt={'Shoelala logo'}/></Link></li>
      <div style={{display:'flex'}}>
      <li style={{padding:5, fontSize:12}}><Link href="/">ALL</Link></li>
      <li style={{padding:5, fontSize:12}}><Link href="/jordan"><SiJordan className='mx-1' size={18}/></Link></li>
      <li style={{padding:5, fontSize:12}}><Link href="/adidas"><SiAdidas className='mx-1' size={18}/></Link></li>
      <li style={{padding:5, fontSize:12}}><Link href="/nike"><SiNike className='mx-1' size={18}/></Link></li>
      <li className='font-semibold cursor-pointer' onClick={() => {setIsOpen(true)}} style={{padding:5}}><AiOutlineShoppingCart className='mx-1' size={18}/></li>
      {/* <li className='font-semibold' style={{padding:5, fontSize:12}}><Link href="/">ACCOUNT</Link></li> */}
      </div>
    </ul>
      {isOpen && <Cart setIsOpen={setIsOpen} />}
    </div>
  )
}

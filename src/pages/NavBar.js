import React, {useState} from 'react'
import Link from 'next/link'
import Cart from './Cart'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { SiJordan, SiNike, SiAdidas } from "react-icons/si";
export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
    <ul className='shadow-md py-2 justify-end pr-10 items-center' style={{position: 'fixed', top: 0, width: '100%', zIndex: 999, display:'flex', justifyContent:'space-between' ,backgroundColor:'white'}}>
      <li className='font-semibold mx-10' style={{padding:5}}><Link href="/"><img className='max-h-8' src={'/shoelala.png'} alt={'Shoelala logo'}/></Link></li>
      <div className='flex'>
      <li className='font-semibold' style={{padding:5, fontSize:12}}><Link href="/">ALL</Link></li>
      <li className='font-semibold' style={{padding:5, fontSize:12}}><Link href="/jordan"><SiJordan className='mx-1' size={18}/></Link></li>
      <li className='font-semibold' style={{padding:5, fontSize:12}}><Link href="/adidas"><SiAdidas className='mx-1' size={18}/></Link></li>
      <li className='font-semibold' style={{padding:5, fontSize:12}}><Link href="/nike"><SiNike className='mx-1' size={18}/></Link></li>
      <li className='font-semibold cursor-pointer' onClick={() => {setIsOpen(true)}} style={{padding:5}}><AiOutlineShoppingCart className='mx-1' size={18}/></li>
      <li className='font-semibold' style={{padding:5, fontSize:12}}><Link href="/account">ACCOUNT</Link></li>
      </div>
    </ul>
      {isOpen && <Cart setIsOpen={setIsOpen} />}
    </div>
  )
}

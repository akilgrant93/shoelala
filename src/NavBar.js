import React, {useState, useEffect, useRef} from 'react'
import Link from 'next/link'
import Cart from './Cart'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { SiJordan, SiNike, SiAdidas } from "react-icons/si";
export default function NavBar(props) {

  const [isOpen, setIsOpen] = useState(false);
  const objectStyle01 = {
    width: '100%',top: 0, zIndex: 999, display:'flex', justifyContent:'space-between' ,backgroundColor:'white', alignItems:'center', boxShadow: '0px 2px 5px rgba(0,0,0,.5)', flexDirection:'column'
  };
  const objectStyle02 = {
    position: 'fixed', width: '100%',top: 0, zIndex: 999, display:'flex', justifyContent:'space-between' ,backgroundColor:'white', alignItems:'center', paddingLeft:40,paddingRight: 40, boxShadow: '0px 2px 5px rgba(0,0,0,.5)',
  };

  const tabStyle01 = {
    display: 'flex',
    marginTop: 5,
    paddingBottom: 10
  };
  const tabStyle02 = {
    display: 'flex',
    flexDirection:'row'
  };

  const buttonStyle01 = {padding:5, marginLeft: 10, marginRight:10, fontSize:12}
  const buttonStyle02 = {padding:10, fontSize:12}

  return (
    <div>
    <ul className='shadow-md flex' style={props.windowDimensions.width < 1024 ? objectStyle01 : objectStyle02}>
      <li style={{padding:5}}><Link href="/"><img style={{height: 35}} src={'/shoelala.png'} alt={'Shoelala logo'}/></Link></li>
      <div style={props.windowDimensions.width < 1024 ? tabStyle01 : tabStyle02}>
      <li style={props.windowDimensions.width < 1024 ? buttonStyle01 : buttonStyle02}><Link href="/">ALL</Link></li>
      <li style={props.windowDimensions.width < 1024 ? buttonStyle01 : buttonStyle02}><Link href="/jordan"><SiJordan className='mx-1' size={18}/></Link></li>
      <li style={props.windowDimensions.width < 1024 ? buttonStyle01 : buttonStyle02}><Link href="/adidas"><SiAdidas className='mx-1' size={18}/></Link></li>
      <li style={props.windowDimensions.width < 1024 ? buttonStyle01 : buttonStyle02}><Link href="/nike"><SiNike className='mx-1' size={18}/></Link></li>
      <li className='font-semibold cursor-pointer' onClick={() => {setIsOpen(true)}} style={props.windowDimensions.width < 1024 ? buttonStyle01 : buttonStyle02}><AiOutlineShoppingCart className='mx-1' size={18}/></li>
      {/* <li className='font-semibold' style={{padding:5, fontSize:12}}><Link href="/">ACCOUNT</Link></li> */}
      </div>
    </ul>
      {isOpen && <Cart windowDimensions={props.windowDimensions} setIsOpen={setIsOpen} />}
    </div>
  )
}

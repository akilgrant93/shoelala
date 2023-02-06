import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Cart from './Cart'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { SiJordan, SiNike, SiAdidas } from "react-icons/si";
export default function NavBar() {

// function getWindowDimensions() {
//   const width = window.innerWidth
//   const height = window.innerHeight
//   return {
//       width,
//       height
//   };
// }

  const [isOpen, setIsOpen] = useState(false);
  // const [width, setWidth] = useState(window.innerWidth);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const objectStyle01 = {
    width: '100%',top: 0, zIndex: 999, display:'flex', justifyContent:'space-between' ,backgroundColor:'white', alignItems:'center', boxShadow: '0px 2px 5px rgba(0,0,0,.5)', flexDirection:'column'
  };
  const objectStyle02 = {
    position: 'fixed', width: '100%',top: 0, zIndex: 999, display:'flex', justifyContent:'space-between' ,backgroundColor:'white', alignItems:'center', paddingLeft:40,paddingRight: 40, boxShadow: '0px 2px 5px rgba(0,0,0,.5)',
  };

  const tabStyle01 = {
    display: 'flex',
    flexDirection:'column'
  };
  const tabStyle02 = {
    display: 'flex'
  };

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  const isValid = false
//   // const {height, width} = useWindowDimensions()
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
}, []);

  return (
    <div>
    <ul className='shadow-md flex' style={windowDimensions.width < 1024 ? objectStyle01 : objectStyle02}>
      <li style={{padding:5}}><Link href="/"><img style={{height: 35}} src={'/shoelala.png'} alt={'Shoelala logo'}/></Link></li>
      <div style={windowDimensions.width < 1024 ? tabStyle01 : tabStyle02}>
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

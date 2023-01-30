import React from 'react'
import { motion } from "framer-motion"
// const item = {
//   hidden: { y: 20, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1
//   }
// };

const item = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 50 }
};

function ListItem(props) {
  return (
    <motion.li variants={item} className={`w-1/5 bg-white mr-5 ${props.index > 3 ? 'mt-5' : ''} py-5 rounded-md shadow-md`}>
      <img src={props.shoe.image} alt={props.shoe.title}/>
      <div className='text-slate-400 text-xs mt-3 px-5'>{props.shoe.category}</div>
      <div className='md:text-xs break-words text-sm font-semibold mt-1 px-5'>{props.shoe.title}</div>
      <div className='text-base font-bold mt-1 px-5'>${props.shoe.price}</div>
            </motion.li>
  )
}

export default ListItem


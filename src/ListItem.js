import React from 'react'
import { motion } from "framer-motion"
import Link from 'next/link'


const item = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 50 }
};

function ListItem(props) {
  return (
    <motion.li variants={item} style={{width: '20%', marginRight: '1.25rem', paddingTop: '1.25rem', paddingBottom: '1.25rem'}} className={`bg-white ${props.index > 3 ? 'mt-5' : ''} rounded-md shadow-lg`}>
      <Link href={`/shoes/${encodeURIComponent(props.shoe.title)}`}>
      <img src={props.shoe.image} alt={props.shoe.title}/>
      <div style={{paddingLeft: '1.25rem', paddingRight: '1.25rem', marginTop: '.75rem'}} className='text-slate-400 text-xs'>{props.shoe.category}</div>
      <div style={{paddingLeft: '1.25rem', paddingRight: '1.25rem', marginTop: '.25rem'}} className='break-words text-sm font-semibold'>{props.shoe.title}</div>
      <div style={{paddingLeft: '1.25rem', paddingRight: '1.25rem', marginTop: '.25rem'}} className='text-base font-bold'>${props.shoe.price}</div>
      </Link>
            </motion.li>
  )
}

export default ListItem


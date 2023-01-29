import React from 'react'

function ListItem(props) {
  return (
    <li className={`w-1/5 bg-white mr-5 ${props.index > 3 ? 'mt-5' : ''} py-5 rounded-md shadow-md`}>
      <img src={props.shoe.image} alt={props.shoe.title}/>
      <div className='text-slate-400 text-xs mt-3 px-5'>{props.shoe.category}</div>
      <div className='text-sm font-semibold mt-1 px-5'>{props.shoe.title}</div>
      <div className='text-base font-bold mt-1 px-5'>${props.shoe.price}</div>
            </li>
  )
}

export default ListItem

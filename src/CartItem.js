import React from 'react'
import { MdDeleteForever } from "react-icons/md";

export default function CartItem(props) {
  return (
    <div style={{paddingBottom: '.5rem', paddingTop: '.5rem', borderBottomWidth: 1}}>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <img style={{width: '25%', height: 'auto'}} src={props.item.image} alt={props.item.title}/>
      <p style={{textAlign:'end', paddingLeft: '2.5rem'}} className='text-xs'>{props.item.title}</p>
      </div>
      <div style={{display:'flex', justifyContent:'flex-end'}}>
      <MdDeleteForever size={14} onClick={() => props.deleteEntry(props.item)} style={{alignSelf:'center', color:'rgb(248 113 113)'}} />
      <input
      style={{marginLeft: '.5rem', paddingLeft: '.5rem', paddingRight: '.5rem', width: '3rem', height:'1.25rem'}}
      className='bg-slate-100 rounded-sm text-xs'
      type={'number'}
      min={0}
      value={props.item.qty}
      onChange={(e) => {props.changeQuantity(e, props.item)}}
      name='quantity'/>
      <p style={{textAlign:'end', marginLeft: '.5rem'}} className='text-xs'>${props.item.qty*props.item.price}</p>
      </div>
    </div>
  )
}

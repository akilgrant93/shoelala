import React from 'react'

export default function CartItem(props) {
  return (
    <div className={['border-b py-2']}>
      <div className='flex justify-between'>
      <img className='w-1/4 h-auto' src={props.item.image} alt={props.item.title}/>
      <p className='text-end text-xs pl-10'>{props.item.title}</p>
      </div>
      <div className='flex justify-end'>
      <input
      className='bg-slate-100 w-12 rounded-sm ml-2 px-2 h-5 text-xs'
      type={'number'}
      min={0}
      value={props.item.qty}
      onChange={(e) => {props.changeQuantity(e, props.item)}}
      name='quantity'/>
      <p className='text-end text-xs ml-2'>${props.item.qty*props.item.price}</p>
      </div>
    </div>
  )
}

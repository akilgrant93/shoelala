import React from 'react'

export default function Sidebar(props) {

  return (
    props.type
    ? <div className='w-96'></div>
    : <div className='px-5'>
      <p className='pb-5 font-semibold'>Filter</p>

      <ul className='pb-5 rounded-lg bg-white shadow-lg'>
        <li className='font-semibold border-b border-slate-200 px-5 py-3 mb-2'>BRAND</li>
        <li className='px-5 py-1 text-xs flex content-center'>
          <input
          type="checkbox"
          checked={props.isJordan}
          onChange={props.categoryChange}
          id="jordan"
          name="jordan"
          value="jordan" />
        <label className='pl-2' htmlFor="jordan">Air Jordan</label></li>
        <li className='px-5 py-1 text-xs flex content-center'>
          <input
          type="checkbox"
          checked={props.isNike}
          onChange={props.categoryChange}
          id="nike"
          name="nike"
          value="nike" />
        <label className='pl-2' htmlFor="nike">Nike</label></li>
        <li className='px-5 py-1 text-xs flex content-center'>
          <input
          type="checkbox"
          checked={props.isAdidas}
          onChange={props.categoryChange}
          id="adidas"
          name="adidas"
          value="adidas" />
        <label className='pl-2' htmlFor="adidas">Adidas</label></li>
      </ul>

      <div className='mt-5 pb-5 rounded-lg bg-white shadow-lg'>
        <p className='font-semibold border-b border-slate-200 px-5 py-3 mb-2'>PRICE</p>
        <form className='flex flex-col'>
        <p className='text-xs mx-5'>FROM</p>
        <input
        className='bg-slate-100 mx-5 p-2 text-xs'
        type="number"
        min={0}
        value={props.priceMinimum}
        onChange={props.minimumChange}
        name="minimum" />
        <p className='text-xs mx-5 mt-2'>TO</p>
        <input
        className='bg-slate-100 mx-5 p-2 text-xs'
        type="number"
        min={0}
        value={props.priceMaximum}
        onChange={props.maximumChange}
        name="maximum" />
        </form>
      </div>

      <ul className='pb-5 rounded-lg bg-white shadow-lg mt-5'>
        <li className='font-semibold border-b border-slate-200 px-5 py-3 mb-2'>ITEMS</li>
        <li className='px-5 py-1 text-xs flex content-center'>
          <input
          type="checkbox"
          checked={props.is20}
          onChange={props.itemAmountChange}
          id="20"
          name="20"
          value="20" />
        <label className='pl-2' htmlFor="20">20</label></li>
        <li className='px-5 py-1 text-xs flex content-center'>
          <input
          type="checkbox"
          checked={props.is40}
          onChange={props.itemAmountChange}
          id="40"
          name="40"
          value="40" />
        <label className='pl-2' htmlFor="40">40</label></li>
        <li className='px-5 py-1 text-xs flex content-center'>
        <input
        type="checkbox"
        checked={props.is100}
        onChange={props.itemAmountChange}
        id="100"
        name="100"
        value="100" />
        <label className='pl-2' htmlFor="100">100</label>
        </li>
      </ul>
      </div>
  )
}

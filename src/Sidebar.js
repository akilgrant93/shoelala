import React, {useState, useEffect} from 'react'

export default function Sidebar(props) {
  const listStyle01 = {
    flexDirection: 'row'
  };
  const listStyle02 = {
    flexDirection: 'column'
  };

  const listItemStyle01 = {
    marginRight: 10
  };

  const listItemStyle02 = {
    marginTop: 10
  };

  return (
    <div className='px-5 flex flex-col pb-10'>
      <p className='pb-5 font-semibold'>Filter</p>

      <div style={props.windowDimensions.width < 1024 ? listStyle01 : listStyle02}  className='flex self-center'>
      <ul style={props.windowDimensions.width < 1024 ? listItemStyle01 : null} className='pb-5 rounded-lg bg-white shadow-lg'>
        <li className='font-semibold border-b border-slate-200 px-5 py-3 mb-2'>BRAND</li>
        <li className='px-5 py-1 text-xs flex content-center'>
          <input
          type="checkbox"
          checked={props.selectedBrand === 'jordan' ? true : false}
          onChange={props.categoryChange}
          id="jordan"
          name="jordan"
          value="jordan" />
        <label className='pl-2' htmlFor="jordan">Air Jordan</label></li>
        <li className='px-5 py-1 text-xs flex content-center'>
          <input
          type="checkbox"
          checked={props.selectedBrand === 'nike' ? true : false}
          onChange={props.categoryChange}
          id="nike"
          name="nike"
          value="nike" />
        <label className='pl-2' htmlFor="nike">Nike</label></li>
        <li className='px-5 py-1 text-xs flex content-center'>
          <input
          type="checkbox"
          checked={props.selectedBrand === 'adidas' ? true : false}
          onChange={props.categoryChange}
          id="adidas"
          name="adidas"
          value="adidas" />
        <label className='pl-2' htmlFor="adidas">Adidas</label></li>
      </ul>

      <ul style={props.windowDimensions.width < 1024 ? listItemStyle01 : listItemStyle02} className='pb-5 rounded-lg bg-white shadow-lg lg:mt-5'>
        <li className='font-semibold border-b border-slate-200 px-5 py-3 mb-2'>ITEMS</li>
        <li className='px-5 py-1 text-xs flex content-center'>
          <input
          type="checkbox"
          checked={props.limit === 20 ? true : false}
          onChange={props.itemAmountChange}
          id="20"
          name="20"
          value="20" />
        <label className='pl-2' htmlFor="20">20</label></li>
        <li className='px-5 py-1 text-xs flex content-center'>
          <input
          type="checkbox"
          checked={props.limit === 40 ? true : false}
          onChange={props.itemAmountChange}
          id="40"
          name="40"
          value="40" />
        <label className='pl-2' htmlFor="40">40</label></li>
        <li className='px-5 py-1 text-xs flex content-center'>
        <input
        type="checkbox"
        checked={props.limit === 100 ? true : false}
        onChange={props.itemAmountChange}
        id="100"
        name="100"
        value="100" />
        <label className='pl-2' htmlFor="100">100</label>
        </li>
      </ul>

      <div style={props.windowDimensions.width < 1024 ? null : listItemStyle02} className='lg:mt-5 pb-5 rounded-lg bg-white shadow-lg'>
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
      </div>
      </div>
  )
}

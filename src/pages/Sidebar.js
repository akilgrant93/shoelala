import React from 'react'

export default function Sidebar() {
  return (
    <div className='px-5  w-full'>
      <p className='pb-5 font-semibold'>Filter</p>

      <ul className='pb-5 rounded-lg bg-white shadow-lg'>
        <li className='font-semibold border-b border-slate-200 px-5 py-3 mb-2'>BRAND</li>
        <li className='px-5 py-1 text-xs'><input type="checkbox" id="jordan" name="jordan" value="jordan" />
        <label className='pl-2' for="jordan">Air Jordan</label></li>
        <li className='px-5 py-1 text-xs'><input type="checkbox" id="nike" name="nike" value="nike" />
        <label className='pl-2' for="nike">Nike</label></li>
        <li className='px-5 py-1 text-xs'><input type="checkbox" id="adidas" name="adidas" value="adidas" />
        <label className='pl-2' for="adidas">Adidas</label></li>
      </ul>

      <div className='mt-5 pb-5 rounded-lg bg-white shadow-lg'>
        <p className='font-semibold border-b border-slate-200 px-5 py-3 mb-2'>PRICE</p>
        <form className='flex flex-col'>
        <p className='text-xs mx-5'>FROM</p>
        <input className='mx-5 p-2' type="number" name="minimum" />
        <p className='text-xs mx-5 mt-2'>TO</p>
        <input className='mx-5 p-2' type="number" name="maximum" />
        <p className='font-semibold border border-slate-200 mx-5 mt-2 px-5 py-3 text-center'>APPLY</p>
        </form>
      </div>

      <ul className='pb-5 rounded-lg bg-white shadow-lg mt-5'>
        <li className='font-semibold border-b border-slate-200 px-5 py-3 mb-2'>ITEMS</li>
        <li className='px-5 py-1 text-xs'><input type="checkbox" id="20" name="20" value="20" />
        <label className='pl-2' for="20">20</label></li>
        <li className='px-5 py-1 text-xs'><input type="checkbox" id="40" name="40" value="40" />
        <label className='pl-2' for="40">40</label></li>
        <li className='px-5 py-1 text-xs'>
        <input type="checkbox" id="100" name="100" value="100" />
        <label className='pl-2' for="100">100</label>
        </li>
      </ul>
      </div>

  )
}

import React from 'react'

export default function Checkout() {
  function MouseOver(event) {
    event.target.style.backgroundColor = 'rgb(245 245 245)';
  }
  function MouseOut(event){
    event.target.style.backgroundColor="white";
  }

  return (
    <div>
      <p style={{fontSize:14, fontWeight:'bold', width: '100%', paddingBottom: 10,borderBottomWidth: 1, borderBottomColor:'rgb(212 212 212)'}}>ACCOUNT</p>
      <p style={{padding: 5, textAlign:'center', marginTop: 30, marginBottom: 30, borderWidth: 1, borderColor:'black', fontSize:14, fontWeight:'bold'}}
      className='rounded-md' onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={() => {
        console.log('guest checkout attempt')
      }}>CHECK OUT AS GUEST</p>
      <p style={{borderTopWidth: 1, borderTopColor:'rgb(212 212 212)', paddingTop: 20, marginBottom: 20, fontSize: 13, fontWeight:'bold'}}>CHECK OUT WITH YOUR ACCOUNT</p>
      <div style={{display:'flex', flexDirection:'column'}}>
      <label htmlFor='email' style={{fontSize:10, paddingTop:5}}>Email Address</label>
      <input
        className='bg-slate-100 p-2 text-xs'
        type="email"
        // min={0}
        // value={props.priceMaximum}
        // onChange={props.maximumChange}
        name="email" />
      <label htmlFor='password' style={{fontSize:10, paddingTop:5}}>Password</label>
      <input
        className='bg-slate-100 p-2 text-xs'
        type="password"
        // min={0}
        // value={props.priceMaximum}
        // onChange={props.maximumChange}
        name="password" />
      </div>

      <p onClick={() => {console.log('forgot password attempt')}} className='font-bold mt-2' style={{fontSize:13, textDecoration:'underline'}}>Forgot Password?</p>

      <p onClick={() => {console.log('login attempt')}} className='py-3 text-white px-5 bg-red-500 font-bold hover:bg-red-700 text-center self-center cursor-pointer mt-2 rounded-md'>LOGIN</p>
    </div>
  )
}

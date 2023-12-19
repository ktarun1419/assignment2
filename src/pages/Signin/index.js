import React, { useState } from 'react';
import './index.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateLoading } from '../../store/slices/preLoginSlice';
const SignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const dispatch=useDispatch()
  const history=useNavigate()
  const handleSignIn = () => {
    if (phoneNumber.length===10) {
        dispatch(updateLoading(true))
        
        axios.post('https://dev.api.goongoonalo.com/v1/auth/login',{phoneNumber:`+91${phoneNumber}`}).then((res)=>{
            console.log({res})
            dispatch(updateLoading(false))
            history('/verify',{state:{phoneNumber:`+91${phoneNumber}`,refId:res?.data?.requestId}})
        }).catch((e)=>{
            dispatch(updateLoading(false))
        })
    }else{
        alert('Please enter coorect phone number')
    }
  };
  const handleChange=(e)=>{
    const {value} =e.target
    if (value.length>10) {
        return
    }
    if (isNaN(value)) {
        return
    }
    setPhoneNumber(value)
  }

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <p>Please enter your mobile number to login. We will send an OTP to verify your number.</p>
      <form onSubmit={(e)=>{e.preventDefault()}}>
        <div className="input-group">
        <div className="input-prefix">
            <img src="https://s3-alpha-sig.figma.com/img/9b18/34ff/193ccc4a6a03590735fe554f328dafb5?Expires=1704067200&Signature=P8En73im1p4uuAYiPYNf3VBZ~WGngW7PjwSEa7nYKWxqwfsxhJKxiIPlajCTlXdGSqUpbzy-ihwK2pR-72qAPIqyXpLz1hscNlUB7lQYf1Yc0dQ6G5WQZj~dXzpD0w2cFXHwK0FBggSYvLcif70FTbQIy-jRrMfTPEHH4EIUXO8ZVuhUCDBrODw2k6wjcKplufHDwlJzN0qvjbHISZvGgNgKZpP8AhkEJxTrcJT~wrqtTj4RZDcO3dQ3XhtjgAXzfswdZ8TULZDZQqNRvBMugjyoaPRQURjM9-NhQJSdsrH8PUbD6ZoQKTh0TajZqgGmJlbm7kiA2PzAJRxuP~wsnA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="Country Flag" className="country-flag-icon"/>
            <span className="country-code">+91</span>
          </div>
          <input type='tel' placeholder="Phone number" value={phoneNumber} onChange={handleChange} />
        </div>
        <button   onClick={handleSignIn} >Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;

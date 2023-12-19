import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateAuthenication, updateLoading, updateToken, updateUserData } from "../../store/slices/preLoginSlice";
const OTPVerification = () => {
  const inputsRef = useRef([]);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const location = useLocation();
  const history=useNavigate()
  const dispatch=useDispatch()
  const routeData = location?.state;
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false; // Ensure that only numbers are allowed
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    console.log({ element });
    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const handleVerify = () => {
    let data = {
      phoneNumber: routeData?.phoneNumber,
      requestId: routeData?.refId,
      otp: otp.join(""),
    };
    dispatch(updateLoading(true))
    axios
      .post("https://dev.api.goongoonalo.com/v1/auth/verify_otp", data)
      .then((res) => {
        let data=res?.data
        console.log(data)
        if (data) {
            dispatch(updateToken(data?.token))
            dispatch(updateAuthenication(true))
            dispatch(updateUserData(data.user))
            dispatch(updateLoading(false))
            history('/songs')
        }
        // console.log({ res });
      });
  };
  useEffect(()=>{
    if (!routeData) {
        history('/')
    }
  },[])
  return (
    <>
      {routeData ? (
        <div className="otp-container">
          <h2 className="otp-heading">OTP Verification</h2>
          <p>
            We have sent an OTP to {routeData?.phoneNumber}. Please enter the
            code received to verify.
          </p>
          <div className="otp-input-container">
            {otp.map((data, index) => {
              return (
                <input
                  key={index}
                  type="text"
                  value={data}
                  maxLength="1"
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                  ref={(ref) => (inputsRef.current[index] = ref)}
                  className="otp-input"
                />
              );
            })}
          </div>
          <button className="verify-btn" onClick={handleVerify}>
            Verify
          </button>
          <button className="resend-btn">Resend OTP</button>
          <button className="change-btn">Use another number</button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default OTPVerification;

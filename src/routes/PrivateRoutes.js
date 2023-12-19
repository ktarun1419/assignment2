import React from 'react'
import { useSelector } from 'react-redux'
// import { preloginSelector } from '../slices/preloginSlice'
import { Navigate } from 'react-router'
import { preloginSelector } from '../store/slices/preLoginSlice'

const PrivateRoutes = ({component:RouteComponent,}) => {
    const {isAuthenticated,token,userData}=useSelector(preloginSelector)
    console.log({isAuthenticated,token,userData})
    if (isAuthenticated && token) {
        return (
         <RouteComponent />
        )
    }else{
        return <Navigate to='/' />
    }
}
export default PrivateRoutes
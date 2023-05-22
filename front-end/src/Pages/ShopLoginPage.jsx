import React, { useEffect } from 'react'
import ShopLogin from '../components/Shop/ShopLogin'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ShopLoginPage = () => {


  const navigate = useNavigate();
  const { isSeller, isloading, seller } = useSelector((state) => state.seller)
  useEffect(() => {
    if (isSeller === true) {
      navigate(`/dashboard`);
    }

  }, [isloading, isSeller])
  return (
    <>
      <ShopLogin />
    </>
  )
}

export default ShopLoginPage
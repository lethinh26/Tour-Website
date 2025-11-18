import React, { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet, useNavigate } from 'react-router'

export const LayoutMain = () => {
  const navigate = useNavigate()
  useEffect(() => {
      navigate('tourtikket')
  }, [])
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

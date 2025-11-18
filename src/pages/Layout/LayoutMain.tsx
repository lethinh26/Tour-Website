import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet, useNavigate } from 'react-router'

export const LayoutMain = () => {
  const navigate = useNavigate()
  useEffect(() => {
      navigate('tourdetail')
  }, [])
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

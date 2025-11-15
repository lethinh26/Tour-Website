import React from 'react'
import { Outlet } from 'react-router'

export const LayoutMain = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/tour')
  }, [])
  return (
    <Outlet/>
  )
}

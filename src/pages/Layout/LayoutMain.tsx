import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

export const LayoutMain = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/tour')
  }, [])
  return (
    <div>
      <Outlet/>
    </div>
  )
}

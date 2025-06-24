import React from 'react'
import {Navbar} from '../features/navigation/components/Navbar'
import {Footer} from '../features/footer/Footer'
import { UserOrders } from '../features/order/components/UserOrders'


export const UserOrdersPage = () => {
  return (
    <>
    <Navbar/>
    <UserOrders/>
    <Footer/>
    </>
  )
}

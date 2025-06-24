import React from 'react'
import { Navbar } from '../features/navigation/components/Navbar'
import {AdminOrders} from '../features/admin/components/AdminOrders'

export const AdminOrdersPage = () => {
    return (
        <>
        <Navbar/>
        <AdminOrders/>
        </>
    )
}
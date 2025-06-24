import React from 'react'
import { Navbar } from '../features/navigation/components/Navbar'
import { ProductUpdate } from '../features/admin/components/ProductUpdate'

export const ProductUpdatePage = () => {
    return (
        <>
        <Navbar/>
        <ProductUpdate/>
        </>
    )
}
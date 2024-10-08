import React from 'react'
import ProductsContainer from '../components/products/ProductsContainer';

const ProductsPage = ({searchParams}:{searchParams:{layout?:string; search?: string}; } ) => {
  console.log(searchParams)
  const layout = searchParams.layout || 'grid';
  const search = searchParams.search || '';



  return (
    <ProductsContainer layout={layout} search={search}/>
  )
}

export default ProductsPage

import { cacheLife } from 'next/cache'
import ProductCard from '../../components/ProductCard'
import React from 'react'

export const metadata = {
  title: "products Oson Prava",
  description: "Praaaaaaaaaaaaaavvvvvvvvvaaaaaaaaaaaaaaaa",
};

async function Products() {

  "use cache"
  cacheLife({
    revalidate:3600,
    expire:3600
  })

  const res = await fetch("https://api.escuelajs.co/api/v1/products?limit=10&offset=1")
  const result = await res.json()

  return (
    <>
      <div className='container mx-auto grid grid-cols-4 gap-[20px] py-[90px]'>
        {
          result?.map((el) => (
            <ProductCard key={el.id} el={el} />
          ))
        }
      </div>
    </>
  )
}

export default Products
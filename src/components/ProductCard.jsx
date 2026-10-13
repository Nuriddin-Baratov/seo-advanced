import Link from 'next/link'
import React from 'react'

function ProductCard({ el }) {
  return (
    <Link href={`/products/${el.id}`} className='p-5 rounded-[20px] bg-blue-500 text-white'>
      <h1>{el.title}</h1>
      <p>{el.description}</p>
    </Link>
  )
}

export default ProductCard
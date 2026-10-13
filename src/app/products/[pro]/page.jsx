import SinglePageCard from '../../../components/SinglePageCard'
import React from 'react'

export async function generateMetadata({ params }) {
  const {pro} = await params;
 

  const post = await fetch(`https://api.escuelajs.co/api/v1/products/${pro}`).then((res) =>
    res.json()
  )
 
  return {
    title: post.title,
    description: post.description,
  }
}
 

async function SinglePage({ params }) {
  const { pro } = await params;

  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${pro}`);
  const data = await res.json();
  console.log(data);
 
  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
      <SinglePageCard data={data} />
    </div>
  )
}

export default SinglePage
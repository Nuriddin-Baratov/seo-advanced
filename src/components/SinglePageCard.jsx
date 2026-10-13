"use client"
import React, { useState } from 'react'

function SinglePageCard({ data }) {
  const [mainImage, setMainImage] = useState(data?.images?.[0] || 'https://via.placeholder.com/400')

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-2">

        <div className="flex flex-col bg-slate-50 p-6">

          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white shadow-sm">
            <img
              src={mainImage}
              alt={data.title}
              className="h-full w-full object-cover object-center transition-all duration-300 hover:scale-105"
            />
          </div>


          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            {data.images?.map((img, index) => (
              <button
                key={index}
                onClick={() => setMainImage(img)}
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg ring-2 transition-all ${
                  mainImage === img ? 'ring-blue-600' : 'ring-transparent hover:ring-blue-300'
                }`}
              >
                <img
                  src={img}
                  alt={`${data.title} rasm ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>


        <div className="flex flex-col p-6 sm:p-8 md:p-10">

          <div className="mb-3">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
              {data.category?.name || "Kategoriya"}
            </span>
          </div>

 
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {data.title}
          </h1>


          <div className="mt-4 flex items-baseline text-3xl font-black text-slate-900">
            ${data.price}
            <span className="ml-1 text-sm font-medium text-slate-500">USD</span>
          </div>


          <div className="mt-6">
            <h3 className="text-sm font-medium text-slate-900">Mahsulot haqida</h3>
            <div className="mt-2 text-base text-slate-600 leading-relaxed">
              {data.description}
            </div>
          </div>


          <div className="mt-auto pt-8 flex flex-col sm:flex-row gap-3">
            <button className="flex-1 rounded-xl bg-blue-600 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all">
              Savatga qo'shish
            </button>
            <button className="flex items-center justify-center rounded-xl bg-slate-100 px-6 py-3.5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-200 transition-all">

              <svg className="mr-2 h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              Saqlash
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SinglePageCard
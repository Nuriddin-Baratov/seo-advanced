import { Suspense } from 'react'
import { cacheLife } from 'next/cache'
import { notFound } from 'next/navigation'
import SinglePageCard from '../../../components/SinglePageCard'

// Keshlangan fetch: metadata ham, sahifa ham shuni ishlatadi
async function getProduct(pro) {
  "use cache"
  cacheLife({ revalidate: 3600, expire: 3600 })

  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${pro}`)
  if (!res.ok) return null
  return res.json()
}

// Build vaqtida ma'lum bo'ladigan param'lar
export async function generateStaticParams() {
  const res = await fetch("https://api.escuelajs.co/api/v1/products?limit=10&offset=1")
  const products = await res.json()
  return products.map((el) => ({ pro: String(el.id) }))
}

export async function generateMetadata({ params }) {
  const { pro } = await params
  const post = await getProduct(pro)

  if (!post) return { title: "Mahsulot topilmadi" }

  return {
    title: post.title,
    description: post.description,
  }
}

async function ProductContent({ params }) {
  const { pro } = await params
  const data = await getProduct(pro)

  if (!data) notFound()

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
      <SinglePageCard data={data} />
    </div>
  )
}

export default function SinglePage({ params }) {
  return (
    <Suspense fallback={<p className="p-8">Yuklanmoqda...</p>}>
      <ProductContent params={params} />
    </Suspense>
  )
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  image: string | null
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch('/api/products', { cache: 'no-store' })
  if (!res.ok) return []
  return res.json()
}

export default async function HomePage() {
  const products = await getProducts()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Cardápio</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-4">R$ {product.price.toFixed(2)}</p>
              <Button>Adicionar ao Carrinho</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export type Product = {
    id: string | number
    name: string
    description: string
    price: number
    imageUrl: string
    merchant: {
        id: string
        businessName: string
    }
  }
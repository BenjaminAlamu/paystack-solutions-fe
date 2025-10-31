
import { useQuery } from '@tanstack/vue-query'
import {
     getAllProducts, getFeaturedProducts
  } from '@/services'
import { ref } from 'vue'
import { GET_FEATURED_PRODUCTS } from '@/services/queryKeys'

  export const useGetFeaturedProducts = () => {
    const {
      data: featuredProducts,
      isLoading: isfeaturedProductsLoading,
      error: featuredProductsError
    } = useQuery({
      queryKey: [GET_FEATURED_PRODUCTS],
      queryFn: async ({ queryKey }) => {
        return getFeaturedProducts()
      }
    })
  
    return {
      featuredProducts,
      isfeaturedProductsLoading,
      featuredProductsError
    }
  }
  
  export const useGetAllProducts = () => {
    const {
      data: allProducts,
      isLoading: isAllProductsLoading,
      error: allProductsError
    } = useQuery({
      queryKey: [GET_FEATURED_PRODUCTS],
      queryFn: async ({ queryKey }) => {
        return getAllProducts()
      }
    })
  
    return {
      allProducts,
      isAllProductsLoading,
      allProductsError
    }
  }
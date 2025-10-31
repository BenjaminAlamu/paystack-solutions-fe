import { getRequest } from '../apiCall'

export const getFeaturedProducts = () => {
    return getRequest({
      url: `/product/featured`,
    })
  }

  export const getAllProducts = () => {
    return getRequest({
      url: `/product`,
    })
  }
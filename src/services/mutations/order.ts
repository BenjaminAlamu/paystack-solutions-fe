import { postRequest } from '../apiCall'

export const createOrder = (data: any) => {
    return postRequest({
      url: `/order`,
      data,
      headers: { 'content-type': 'application/json' }
    })
  }

  export const generateDVA = (code: string) => {
    return postRequest({
      url: `/order/dva`,
      data: {code},
      headers: { 'content-type': 'application/json' }
    })
  }

  export const verifyMockTransaction = (code: string) => {
    return postRequest({
      url: `/order/mock/callback`,
      data: {code},
      headers: { 'content-type': 'application/json' }
    })
  }

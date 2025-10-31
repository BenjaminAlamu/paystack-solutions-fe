import type { loginUserType, newUserType } from '@/types'
import { postRequest } from '../apiCall'

export const createUserAccount = (data: newUserType) => {
    return postRequest({
      url: `/user`,
      data,
      headers: { 'content-type': 'application/json' }
    })
  }


  export const login = (data: loginUserType) => {
    return postRequest({
      url: `/login`,
      data,
      headers: { 'content-type': 'application/json' }
    })
  }
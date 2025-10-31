import { getRequest } from '../apiCall'

export const getSingleOrder = (code: string) => {
    return getRequest({
      url: `/order/${code}`,
    })
  }

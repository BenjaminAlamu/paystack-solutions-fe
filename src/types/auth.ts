export type newUserType = {
    firstName: string
    email: string
    lastName: string
    password: string
  }
  
  export type loginUserType = {
    email: string
    password: string
  }

  export type AuthUserType = {
    firstName: string
    email: string
    lastName: string

  }
  
  export type AuthStoreType = {
    user?: AuthUserType
    token?: string
  }
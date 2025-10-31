
import { useMutation } from '@tanstack/vue-query'
import {
    createUserAccount, login
  } from '@/services'

export const useRegisterUser = () => {
    const {
      isPending: isCreatingUserAccount,
      isError: isCreatingUserAccountError,
      error: createUserError,
      isSuccess: createUserSuccess,
      mutate: handleCreateUserAccount
    } = useMutation({
      mutationFn: createUserAccount,
    })
  
    return {
      handleCreateUserAccount,
      isCreatingUserAccount,
      isCreatingUserAccountError,
      createUserError,
      createUserSuccess
    }
  }

  export const useLoginUser = () => {
    const {
      isPending: isLoggingIn,
      isError: isLoggingInError,
      error: loginUserError,
      isSuccess: loginUserSuccess,
      mutate: handleLoginUser
    } = useMutation({
      mutationFn: login,
    })
  
    return {
      handleLoginUser,
      isLoggingIn,
      isLoggingInError,
      loginUserError,
      loginUserSuccess
    }
  }
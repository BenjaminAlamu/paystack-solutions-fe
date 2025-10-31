import type { AuthStoreType } from '@/types'
import { defineStore } from 'pinia'

export const useAuthState = defineStore('AuthState', {
  state: (): AuthStoreType => {
    return {
      user: undefined,
      token: localStorage.getItem('token') || undefined
    }
  },
  getters: {
    isLoggedIn(state): boolean {
      return !!state.token
    },
    getUser(state): any {
      return state.user
    },
    getToken(state): any {
      return state.token
    }
  },
  actions: {
    setUser(user: any) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    setToken(token: string) {
      this.token = token
      localStorage.setItem('token', token)
    },
    logout() {
      this.user = undefined
      this.token = undefined
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
})
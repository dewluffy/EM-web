import { create } from "zustand";
import { actionLogin } from "../api/auth";
import { persist } from 'zustand/middleware'

//  Create Store
const authStore = (set) => ({
  accessToken: null,
  user: null,
  
  // Login
  actionLoginWithZustand: async (value) => {
    try {
      const res = await actionLogin(value)
      const { user, accessToken } = res.data
      set({ accessToken, user })
      return { success: true, role: user.role }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      }
    }
  },

  // Logout
  actionLogout: () => {
    set({ accessToken: null, user: null })
  }
})

// UseStore
const useAuthStore = create(
  persist(authStore, { name: "auth-store" })
)

export default useAuthStore

import { create } from "zustand"
import { persist } from "zustand/middleware"
import axios from "axios"

const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

const api = axios.create({ baseURL: BASE })
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// AUTH
export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      admin: null,
      loading: false,
      error: null,

      login: async (email, password) => {
        set({ loading: true, error: null })
        try {
          const { data } = await api.post("/admin/login", { email, password })
          localStorage.setItem("admin_token", data.token)
          set({ token: data.token, admin: data, loading: false })
          return { ok: true }
        } catch (err) {
          const msg = err.response?.data?.message || "Login failed"
          set({ error: msg, loading: false })
          return { ok: false, message: msg }
        }
      },

      logout: () => {
        localStorage.removeItem("admin_token")
        set({ token: null, admin: null })
      },
    }),
    { name: "auth", partialize: (s) => ({ token: s.token, admin: s.admin }) }
  )
)

// PROJECTS
export const useProjectStore = create((set) => ({
  projects: [],
  loading: false,

  fetchAll: async () => {
    set({ loading: true })
    try {
      const { data } = await api.get("/projects")
      set({ projects: data, loading: false })
    } catch { set({ loading: false }) }
  },

  create: async (payload) => {
    const { data } = await api.post("/projects", payload)
    set((s) => ({ projects: [...s.projects, data] }))
    return data
  },

  update: async (id, payload) => {
    const { data } = await api.put(`/projects/${id}`, payload)
    set((s) => ({ projects: s.projects.map((p) => (p._id === id ? data : p)) }))
    return data
  },

  remove: async (id) => {
    await api.delete(`/projects/${id}`)
    set((s) => ({ projects: s.projects.filter((p) => p._id !== id) }))
  },
}))

// MESSAGES
export const useMessageStore = create((set) => ({
  messages: [],
  loading: false,

  fetchAll: async () => {
    set({ loading: true })
    try {
      const { data } = await api.get("/messages")
      set({ messages: data, loading: false })
    } catch { set({ loading: false }) }
  },

  markRead: async (id) => {
    await api.patch(`/messages/${id}/read`)
    set((s) => ({ messages: s.messages.map((m) => (m._id === id ? { ...m, status: "read" } : m)) }))
  },

  remove: async (id) => {
    await api.delete(`/messages/${id}`)
    set((s) => ({ messages: s.messages.filter((m) => m._id !== id) }))
  },
}))

// PROFILE
export const useProfileStore = create((set) => ({
  profile: null,
  loading: false,

  fetchProfile: async () => {
    set({ loading: true })
    try {
      const { data } = await api.get("/profile")
      set({ profile: data, loading: false })
    } catch { set({ loading: false }) }
  },

  updateProfile: async (payload) => {
    const { data } = await api.put("/profile", payload)
    set({ profile: data })
    return data
  },
}))

// SOCIAL LINKS
export const useSocialStore = create((set) => ({
  links: [],
  loading: false,

  fetchAll: async () => {
    set({ loading: true })
    try {
      const { data } = await api.get("/social")
      set({ links: data, loading: false })
    } catch { set({ loading: false }) }
  },

  create: async (payload) => {
    const { data } = await api.post("/social", payload)
    set((s) => ({ links: [...s.links, data] }))
  },

  update: async (id, payload) => {
    const { data } = await api.put(`/social/${id}`, payload)
    set((s) => ({ links: s.links.map((l) => (l._id === id ? data : l)) }))
  },

  remove: async (id) => {
    await api.delete(`/social/${id}`)
    set((s) => ({ links: s.links.filter((l) => l._id !== id) }))
  },
}))

// TECH ICONS
export const useTechStore = create((set) => ({
  icons: [],
  loading: false,

  fetchAll: async () => {
    set({ loading: true })
    try {
      const { data } = await api.get("/tech-icons")
      set({ icons: data, loading: false })
    } catch { set({ loading: false }) }
  },

  create: async (payload) => {
    const { data } = await api.post("/tech-icons", payload)
    set((s) => ({ icons: [...s.icons, data] }))
  },

  remove: async (id) => {
    await api.delete(`/tech-icons/${id}`)
    set((s) => ({ icons: s.icons.filter((i) => i._id !== id) }))
  },
}))

// UI
export const useUIStore = create((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
}))

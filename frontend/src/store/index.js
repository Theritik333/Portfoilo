import { create } from "zustand"
import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
})

export const useStore = create((set, get) => ({
  profile: null,
  projects: [],
  socialLinks: [],
  techIcons: [],
  loading: false,
  error: null,

  fetchAll: async () => {
    set({ loading: true, error: null })
    try {
      const [profRes, projRes, socRes, techRes] = await Promise.all([
        api.get("/profile"),
        api.get("/projects"),
        api.get("/social"),
        api.get("/tech-icons"),
      ])
      set({
        profile: profRes.data,
        projects: projRes.data,
        socialLinks: socRes.data,
        techIcons: techRes.data,
        loading: false,
      })
    } catch (err) {
      set({
        error: err?.response?.data?.message || err.message || "Backend se connect nahi hua",
        loading: false,
      })
    }
  },

  getProjectBySlug: (slug) => get().projects.find((p) => p.slug === slug),

  submitContact: async (payload) => {
    const { data } = await api.post("/messages", payload)
    return data
  },
}))

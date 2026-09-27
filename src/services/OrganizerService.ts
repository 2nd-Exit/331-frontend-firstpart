import axios from 'axios'
import type { Organizer } from '@/types'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getOrganizers() {
    return apiClient.get('/organizers')
  },
  
  saveOrganizer(organizer: Organizer) {
    return apiClient.post('/organizers', organizer)
  },

  getOrganizerImage(imageKey: string) {
    return apiClient.get<string>('/presignedUrl', {
      params: { fileName: imageKey },
      responseType: 'text',
    }).then((response) => response.data)
  }
}
import apiClient from './AxiosClient'
import type { Organizer } from '@/types'

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
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import OrganizerService from '@/services/OrganizerService'
import type { Organizer } from '@/types'

const organizer = ref<Organizer | null>(null)
const imageUrl = ref<string>('')
const route = useRoute()
const router = useRouter()

onMounted(() => {
  const id = parseInt(route.params.id as string)
  OrganizerService.getOrganizers()
    .then((response) => {
      const found = response.data.find((o: Organizer) => o.id === id)
      if (found) {
        organizer.value = found
        if (found.image && !found.image.startsWith('http')) {
          OrganizerService.getOrganizerImage(found.image)
            .then((url) => {
              imageUrl.value = url
            })
            .catch((err) => console.error("Error loading image", err))
        } else {
          imageUrl.value = found.image
        }
      }
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
})
</script>

<template>
  <div v-if="organizer" class="flex flex-col items-center justify-center p-6 text-center">
    <h1 class="text-3xl font-bold mb-4">{{ organizer.name }}</h1>

    <div v-if="imageUrl" class="mt-4">
      <img 
        :src="imageUrl" 
        alt="Organizer Image" 
        class="w-48 h-48 object-cover rounded border border-gray-300 shadow-md"
      />
    </div>
    <p v-else class="text-gray-500 mt-2">No image available</p>
  </div>
  <div v-else class="p-6">
    <p>Loading organizer details...</p>
  </div>
</template>
<script setup lang="ts">
import type { Organizer } from '@/types'
import { ref } from 'vue'
import OrganizerService from '@/services/OrganizerService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import ImageUpload from '@/components/ImageUpload.vue'

const organizer = ref<Organizer>({
  id: null,
  name: '',
  image: ''
})

const images = ref<string[]>([])

const router = useRouter()
const store = useMessageStore()

function saveOrganizer() {
  if (images.value.length > 1) {
    store.updateMessage('Error: You can only upload one image for the organizer.')
    setTimeout(() => {
      store.resetMessage()
    }, 3000)
    return
  }

  if (images.value.length === 1) {
    organizer.value.image = images.value[0] || ''
  } else {
    organizer.value.image = ''
  }

  OrganizerService.saveOrganizer(organizer.value)
    .then((response) => {
      store.updateMessage('You successfully added a new organizer: ' + response.data.name)
      setTimeout(() => {
        store.resetMessage()
      }, 3000)
      
      router.push({ name: 'event-list-view' })
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
}
</script>

<template>
  <div>
    <h1>Create an Organizer</h1>
    <form @submit.prevent="saveOrganizer">
      <label class="block text-gray-500 font-bold">Organizer Name</label>
      <input
        v-model="organizer.name"
        type="text"
        placeholder="Enter organizer name"
        class="h-13 w-full px-2.5 text-xl border border-gray-400 focus:border-emerald-500 focus:outline-none mb-6"
      />

      <h3 class="block text-gray-500 font-bold mb-2 mt-4">Organizer Image (Max 1)</h3>
      <ImageUpload v-model="images" />

      <button
        class="mt-8 flex w-fit mx-auto items-center justify-center h-13 px-10 rounded-md font-semibold whitespace-nowrap border border-gray-400 focus:border-emerald-500 transition-all duration-200 ease-linear hover:scale-105 hover:border-emerald-500 hover:shadow-lg active:scale-100 focus:outline-none"
        type="submit"
      >
        Submit
      </button>
    </form>
  </div>
</template>
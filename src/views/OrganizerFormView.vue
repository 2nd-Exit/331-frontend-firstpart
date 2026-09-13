<script setup lang="ts">
import type { Organizer } from '@/types'
import { ref } from 'vue'
import OrganizerService from '@/services/OrganizerService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const organizer = ref<Organizer>({
  id: 0,
  name: ''
})

const router = useRouter()
const store = useMessageStore()

function saveOrganizer() {
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

      <button
        class="flex w-fit mx-auto items-center justify-center h-13 px-10 rounded-md font-semibold whitespace-nowrap border border-gray-400 focus:border-emerald-500 transition-all duration-200 ease-linear hover:scale-105 hover:border-emerald-500 hover:shadow-lg active:scale-100 focus:outline-none"
        type="submit"
      >
        Submit
      </button>
    </form>
  </div>
</template>
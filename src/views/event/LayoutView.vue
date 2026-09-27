<script setup lang="ts">
import { useEventStore } from '@/stores/event'
import { storeToRefs } from 'pinia'

const store = useEventStore()
const { event } = storeToRefs(store)
</script>
<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>

    <p class="text-gray-600 mb-4">
      by 
      <RouterLink 
        v-if="event.organizer"
        :to="{ name: 'organizer-detail-view', params: { id: event.organizer.id } }"
        class="text-blue-600 hover:underline font-semibold"
      >
        {{ event.organizer.name }}
      </RouterLink>
    </p>
    
    <nav>
      <RouterLink :to="{ name: 'event-detail-view' }">Details</RouterLink>
      |
      <RouterLink :to="{ name: 'event-register-view' }">Register</RouterLink>
      |
      <RouterLink :to="{ name: 'event-edit-view' }">Edit</RouterLink>
    </nav>
    <RouterView :event="event" />
  </div>
</template>

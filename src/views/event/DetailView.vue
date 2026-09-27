<script setup lang="ts">
import { toRefs, watchEffect } from 'vue'
import { type Event } from '@/types'
import EventService from '@/services/EventService'

const props = defineProps<{
  event: Event
}>()

const { event } = toRefs(props)

watchEffect(() => {
    if (event.value?.images && event.value.images.length > 0) {
        
        if (!event.value!.images[0].startsWith('http')) {
            EventService.getEventImages(event.value!.images).then((urls: string[]) => {
                event.value!.images = urls
            }).catch((error: any) => {
                console.error("Error fetching images", error)
            })
        }
    }
})
</script>

<template>
  <p>{{ event.title }} @ {{ event.location }}</p>
  <p>{{ event.description }}</p>

  <div class="flex flex-row flex-wrap justify-center">
    <img 
        v-for="image in event.images" 
        :key="image" 
        :src="image" 
        alt="events image" 
        class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-40 hover:shadow-lg" 
    />
  </div>
</template>
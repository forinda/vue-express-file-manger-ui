<script lang="ts" setup>
import { ref } from "vue";
import proj from "@/data/projects.json";
const projects = ref(proj);
</script>

<template>
  <div class="p-4">
    <div class="flex items-center justify-center flex-col gap-4">
      <h1 class="text-4xl font-bold underline uppercase">Projects</h1>
      <p class="text-gray-500">Here are some of my projects</p>
    </div>
    <div class="border p-4 container mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="project in projects"
          :key="project.name"
          class="border p-4 rounded-lg"
        >
          <h2 class="text-2xl font-bold uppercase">{{ project.name }}</h2>
          <p class="text-gray-500">{{ project.description }}</p>
          <div class="flex items-center justify-center gap-4">
            <router-link :to="`/projects/${project.name}`"
            
            >
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              >
                View
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

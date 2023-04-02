<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import api from "@/api";
import { useRouter } from "vue-router";
import FileTile from "@/components/FileTile.vue";
import { MediaFileInterface } from "@/types";

const router = useRouter();
const projectImages = ref<Array<MediaFileInterface>>([]);
const project = router.currentRoute.value.params.projectId;
onMounted(async () => {
  const fetchImages = async function () {
    try {
      const response = await api.get(`/images/project/${project}`);
      const data = await response.data; //();
      console.log(data);
      projectImages.value = data;
    } catch (error) {
      console.log(error);
    }
  };
  return Promise.all([fetchImages()]);
});
const folders = computed(() => {
  return projectImages.value.map((image) => image.folderFullPath);
});
</script>
<template>
  <main>
    <div class="border">
      <div></div>
    </div>
    <div
      class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 container mx-auto gap-4 grid-rows-[repeat(auto-fill,300px)]]"
    >
      <file-tile :file="image" v-for="image of projectImages"></file-tile>
    </div>
  </main>
</template>

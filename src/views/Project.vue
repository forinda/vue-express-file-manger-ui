<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import axios from "axios";
import api from "@/api";
import { useRouter } from "vue-router";
import FileTile from "@/components/FileTile.vue";
import { MediaFileInterface } from "@/types";
import Uploader from "@/components/Uploader.vue";

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
  <main
    v-if="projectImages.length > 0"
    class="mx-auto container p-2 flex flex-col gap-2 bg-white"
  >
    <div class="border">
      <div class="flex flex-col gap-4 p-2 border rounded">
        <div class="text-center">Project <span class="text-blue-600 border font-bold">{{ project }}</span></div>
        <hr>
        <div class="flex justify-between items-center">
          <div>
            <router-link
              :to="{ name: 'home' }"
              class="flex items-center gap-1 border p-1 rounded bg-blue-700 text-white px-4 w-fit"
              ><fa icon="fa-folder-open" class=""></fa
              ><span>Go back home</span></router-link
            >
          </div>
          <div>
            <router-link
              :to="{ name: 'upload-image', params: { projectId: project } }"
              class="flex items-center gap-1 border p-1 rounded bg-blue-700 text-white px-4 w-fit"
              ><fa icon="fa-upload" class=""></fa
              ><span>Upload to project</span></router-link
            >
          </div>
        </div>
      </div>
    </div>
    <div
      class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 container mx-auto gap-4 grid-rows-[repeat(auto-fill,300px)]]"
    >
      <file-tile :file="image" v-for="image of projectImages"></file-tile>
    </div>
  </main>
  <uploader v-else :project="String(project)"></uploader>
</template>

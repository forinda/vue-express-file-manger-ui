<script setup lang="ts">
import api from "@/api";
import { MediaFileInterface } from "@/types";
import { computed, onMounted, ref, defineProps } from "vue";
import DropDown from "./DropDown.vue";

const { file } = defineProps({
  file: {
    type: Object as () => MediaFileInterface,
    required: true,
  },
});
const deleteFile = async function (file: MediaFileInterface) {
  try {
    const conf = confirm("Are you sure you want to delete this file?");
    if (!conf) return;
    const response = await api.delete(`/images/${file._id}/delete`);
    const data = await response.data;
    console.log(data);
    if (data.success) {
      alert("File deleted successfully");
    } else {
      alert("File could not be deleted");
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <div class="border">
    <div class="p-2 flex items-center">
      <div class="flex-1 text-[10px] whitespace-pre-line text-clip">
        {{ file.originalname }}
      </div>
      <div class="relative">
        <drop-down>
          <template #action="{ handleClick }">
            <button
              @click="handleClick"
              class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
            >
              <!-- <span class="mr-1">Options</span> -->
              <fa icon="fa fa-ellipsis-v"></fa>
            </button>
          </template>
          <template #content>
            <ul
              class="shadow-md rounded my-2 absolute bg-white z-50 right-0 border"
            >
              <li>
                <router-link
                  to="#"
                  class="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 items-center gap-2"
                  ><fa icon="fa fa-eye" class="text-[10px]"></fa
                  ><span> View </span>
                </router-link>
              </li>
              <li>
                <router-link
                  to="#"
                  class="gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 flex items-center"
                >
                  <fa icon="fa fa-download" class="text-[10px]"></fa>
                  <span>Download</span>
                </router-link>
              </li>
              <li>
                <button
                    @click="deleteFile(file)"
                  class="gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 flex items-center"
                >
                  <fa icon="fa fa-trash" class="text-[10px]"></fa>
                  <span>Delete</span>
                </button>
              </li>
            </ul>
          </template>
        </drop-down>
      </div>
    </div>
    <div class="relative">
      <img :src="file.url" class="w-full h-full object-cover" alt="thumbnail" />
      <div
        class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"
      ></div>
      <div
        class="absolute top-0 left-0 w-full h-full flex items-center justify-center"
      ></div>
    </div>
  </div>
</template>

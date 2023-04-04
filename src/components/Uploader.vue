<script setup lang="ts">
import api from "@/api";
import { ImageMimeTypes } from "@/types/image-mime-types";
import { ref, computed, defineProps } from "vue";
import { useRouter } from "vue-router";

const { project,showNofiles } = defineProps({
  project: {
    type: String,
    required: true,
  },
  showNofiles: {
    type: Boolean,
    default: false,
    required: false,
  },
});
const router = useRouter();
const handleFileUpload = async function (e: Event) {
  //   const formData = new FormData();
  //   formData.append("file", selectedFile.value!);
  //   console.log("Submitting", formData.get("file"));
  try {
    const response = await api.post(
      `/images/upload?project=${project}`,
      {
        file: selectedFile.value,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log({ response: response.data });
    await router.push({ name: "project", params: { projectId: project } });
  } catch (error) {
    console.log(error);
  }
};
const selectedFile = ref<File | null>(null);
const form = ref<HTMLFormElement | null>(null);
const handleFileChange = (e: Event) => {
  e.preventDefault();
  const target = e.target as HTMLInputElement;
  selectedFile.value = target.files![0];
  console.log({ selectedFile });
  console.log(typeof selectedFile);
};
const fileToUploadExistName = computed(() => {
  return selectedFile.value === null
    ? "Click here to upload"
    : selectedFile.value.name;
});
type MediaObj = {
  type: "audio" | "video" | "image" | undefined;
  url: string;
};
const fileType = computed((): MediaObj => {
  const allowedMimeTypes: ImageMimeTypes[] = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/svg+xml",
    "image/webp",
    "image/x-icon",
    "image/pjpeg",
    "image/tiff",
    "image/jpg",
  ];
  if (
    selectedFile !== null &&
    allowedMimeTypes.includes(selectedFile.value!?.type as ImageMimeTypes)
  ) {
    return {
      type: "image",
      url: URL.createObjectURL(selectedFile.value!),
    };
  }
  return {
    type: undefined,
    url: "",
  };
});
</script>
<template>
  <main class="min-h-screen flex flex-col items-center justify-center">
    <div v-if="showNofiles">
      <h1
        class="flex gap-4 items-center p-4 rounded border-dotted border-black"
      >
        <span>No files found</span> <fa icon="fas fa-folder-open"></fa>
      </h1>
    </div>
    <div>
      <form
        @submit.prevent.stop="handleFileUpload"
        action=""
        method="post"
        enctype="multipart/form-data"
        class="w-full md:max-w-lg border shadow p-4 rounded"
        ref="form"
      >
        <label for="file" class="">
          <div
            class="flex flex-col gap-2 border border-black p-10 rounded bg-gray-300 cursor-pointer bg-opacity-50"
          >
            <fa icon="fa-file-upload"></fa>
            <p>{{ fileToUploadExistName }}</p>
          </div>
        </label>
        <input
          type="file"
          @change.prevent.stop="handleFileChange"
          :multiple="false"
          name="file"
          id="file"
          hidden
          accept="img/jpg,img/jpeg,img/png"
        />
        <div class="flex items-center justify-center">
          <div v-if="fileType.type === 'image'">
            <img :src="fileType.url" alt="" class="h-64 w-64 object-cover" />
          </div>
        </div>
        <div class="p-2" v-if="selectedFile">
          <button
            type="submit"
            class="px-6 py-2 bg-blue-500 text-white w-full rounded"
          >
            Upload
            {{
              fileType.type === "image"
                ? "Image"
                : fileType.type === "video"
                ? "Video"
                : fileType.type === "audio"
                ? "Audio"
                : "file"
            }}
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

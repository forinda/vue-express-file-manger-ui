<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Uploader from "@/components/Uploader.vue";
const router = useRouter();
const project = router.currentRoute.value.params.projectId;
</script>
<template>
  <uploader :project="String(project)" :show-nofiles="false"></uploader>
</template>
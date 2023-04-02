<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
const dropdownRef = ref<HTMLDivElement | null>(null);
const isOpen = ref<boolean>(false);
const router = useRouter();
const handleClick = () => {
  isOpen.value = !isOpen.value;
};

const handleClickOutside = (e: Event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});
defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  parentClass: {
    type: String,
    default: "",
  },
  btnClass: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "Dropdown",
  },
});
watch(
  () => router.currentRoute.value.path,
  () => {
    isOpen.value = false;
  }
);
</script>
<template>
  <div ref="dropdownRef" :class="parentClass">
    <slot name="action" :handleClick="handleClick">
      <button type="button" @click="handleClick" :class="btnClass">
        {{ title }} <fa v-if="!isOpen" icon="fa-chevron-down"></fa>
        <fa v-else icon="fa-chevron-up"></fa>
      </button>
    </slot>
    <div v-if="isOpen">
      <slot name="content"></slot>
    </div>
  </div>
</template>

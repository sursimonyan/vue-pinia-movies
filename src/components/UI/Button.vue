<script setup lang="ts">
import { type PropType, computed } from 'vue';
import type { ButtonType } from '../../types/types';

const props = defineProps({
  btnType: {
    type: String as PropType<ButtonType>,
  },
  isActive: {
    type: Boolean,
  }
})

const selectedTab = computed(() => {
  if (props.isActive) {
    return "text-white bg-green-500 rounded-md hover:bg-green-600";
  }
})

const buttonStyles = computed(() => {
  switch (props.btnType) {
    case 'delete':
      return "text-white bg-red-500 rounded-md hover:bg-red-600";
    case 'watch':
      return "text-white bg-sky-400 rounded-md hover:bg-sky-500";
    default:
      return 'text-black bg-gray-200 rounded-md hover:bg-gray-300';
  }
});

</script>

<template>
  <button class="h-10 px-5" :class="buttonStyles, selectedTab">
    <slot></slot>
  </button>
</template>

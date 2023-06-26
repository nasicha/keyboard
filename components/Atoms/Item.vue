<template>
  <div class="flex flex-col">
    <span class="font-medium">
      <slot />
    </span>
    <span
      class="font-medium text-sm text-dark-50 opacity-80 dark:text-light-900 dark:opacity-50"
      >{{ label }}</span
    >
  </div>
</template>
<script setup lang="ts">
defineProps<{ label: string }>();
</script>

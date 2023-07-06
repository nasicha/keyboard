<template>
  <span class="text-lg sm:text-2xl md:text-4xl">{{ character }}</span>
</template>

<script lang="ts" setup>
  defineProps<{ character: string }>();
</script>
```
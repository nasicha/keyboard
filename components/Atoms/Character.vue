<template>
  <span class="text-lg xs:text-2xl sm:text-4xl">{{ character }}</span>
</template>

<script lang="ts" setup>
  defineProps<{ character: string }>();
</script>
```
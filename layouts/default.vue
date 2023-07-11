<template>
  <Header />
  
  <div class="w-full px-2 md:max-w-screen-md mx-auto mt-4">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import Header from "@/components/Molecules/Header.vue";
</script>
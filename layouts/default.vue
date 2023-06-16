<template>
  <div>
  <Header />
  
    <slot />
  </div>
</template>
<script lang="ts" setup>
import Header from "@/components/Molecules/Header.vue";
</script>
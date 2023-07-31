<template>
  <div class="nav">
    <NuxtLink 
      to="/"
      class="flex justify-center items-center gap-2"
    >
      <HanaDSLogo class="w-8 h-8" />
      <span>Hana DS</span>
    </NuxtLink>
    <NuxtLink to="/pangram">Pangram</NuxtLink>
    <NuxtLink to="/phrases">Phrases</NuxtLink>
    <NuxtLink to="/demo">Demo</NuxtLink>
  </div>
</template>
<script setup lang="ts">
import HanaDSLogo from "@/assets/icons/hana_ds-logo-bg.svg?component";
</script>
<style lang="scss" scoped>
.nav {
  @apply flex w-full bg-base p-2 items-center gap-2;

  & a {
    @apply text-center text-secondary px-4 py-2 bg-base border border-secondary rounded-full;

    &.router-link-active {
      @apply bg-secondary text-base border-base;
    }
    
    &:hover {
      @apply bg-secondary text-base border-base;
    }
  }

}
</style>
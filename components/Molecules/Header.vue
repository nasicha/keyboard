<template>
  <div class="nav">
    <NuxtLink 
      to="/"
      class="nav-link nav-link-logo"
    >
      <HanaDSLogo class="w-8 h-8" />
      <span>Hana DS</span>
    </NuxtLink>
    <div class="nav-link nav-link-wrapper">
      <NuxtLink to="/pangram">Pangram</NuxtLink>
      <NuxtLink to="/pangram/without_keyboard">w/o Hana DS</NuxtLink>
    </div>
    <div class="nav-link nav-link-wrapper">
      <NuxtLink to="/phrases">Phrases</NuxtLink>
      <NuxtLink to="/phrases/without_keyboard">w/o Hana DS</NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import HanaDSLogo from "@/assets/icons/hana_ds-logo-bg.svg?component";
</script>
<style lang="scss" scoped>
.nav {
  @apply flex w-full bg-base p-2 items-center gap-2;
  &-link {
    @apply text-center text-secondary bg-base border border-secondary rounded-full;

    &-logo {
      @apply flex justify-center px-4 py-2 items-center gap-2;
    }

    &-wrapper {
      @apply flex h-full overflow-hidden;

      & > a {
        @apply first:border-r px-4 py-2;
        &.router-link-active {
          @apply bg-secondary text-base border-base;
        }

        &:hover {
          @apply bg-secondary text-base border-base;
        }
      }
    }

    &.router-link-active:not(.nav-link-wrapper) {
      @apply bg-secondary text-base border-base;
    }
    
    &:hover:not(.nav-link-wrapper) {
      @apply bg-secondary text-base border-base;
    }
  }
}
</style>
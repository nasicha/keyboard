<template>
  <div class="nav">
    <NuxtLink to="/">Home</NuxtLink>
    <NuxtLink to="/demo">Demo</NuxtLink>
  </div>
</template>
<style lang="scss">
@use "@/assets/scss/baseColors.scss" as *;

.nav {
  @apply flex w-full p-4 bg-base;

  & a {
    @apply w-1/4 text-center border-l-2 last:border-r-2 text-white;
    
    &:hover {
      @apply underline;
    }
  }
}
</style>
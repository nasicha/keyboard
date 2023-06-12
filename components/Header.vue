<template>
  <div class="nav">
    <NuxtLink to="/">Home</NuxtLink>
    <NuxtLink to="/layout">Layout</NuxtLink>
    <NuxtLink to="/groups">Groups</NuxtLink>
    <NuxtLink to="/demo">Demo</NuxtLink>
  </div>
</template>
<style lang="scss">
.nav {
  @apply flex w-full p-4 bg-slate-800;

  & a {
    @apply w-1/4 text-center border-l-2 last:border-r-2 text-white;
    &:hover {
      @apply underline;
    }
  }
}
</style>
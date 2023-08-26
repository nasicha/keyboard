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
      <NuxtLink v-if="showHanaDSHeader" to="/pangram">Pangram</NuxtLink>
      <NuxtLink v-else to="/pangram/without_keyboard">Pangram w/o Hana DS</NuxtLink>
    </div>
    <div class="nav-link nav-link-wrapper">
      <NuxtLink v-if="showHanaDSHeader" to="/phrases">Phrases</NuxtLink>
      <NuxtLink v-else to="/phrases/without_keyboard">Phrases w/o Hana DS</NuxtLink>
    </div>
    <div class="nav-link nav-link-wrapper">
      <NuxtLink v-if="showHanaDSHeader" to="/sandbox">Sandbox</NuxtLink >
      <NuxtLink v-else to="/sandbox/without_keyboard">Sandbox w/o Hana DS</NuxtLink>
    </div>
    <div class="nav-link nav-link-logo" :class="{active: showHanaDSHeader}" @click="toggleHanaDSHeader">
      <GameController class="w-8 h-8" :class="showHanaDSHeader ? 'invert-0' : 'invert'" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import HanaDSLogo from "@/assets/icons/hana_ds-logo-bg.svg?component";
import GameController from "@/assets/icons/game-controller.svg?component";

const showHanaDSHeader = ref(true);

onMounted(() => {
  if (localStorage.getItem("showHanaDSHeader")) {
    showHanaDSHeader.value = localStorage.getItem("showHanaDSHeader") === "true";
  }
});


    // showHanaDSHeader.value = !showHanaDSHeader.value;
    // localStorage.setItem("showHanaDSHeader", showHanaDSHeader.value.toString());

  const route = useRouter();

  const toggleHanaDSHeader = () => {
    showHanaDSHeader.value = !showHanaDSHeader.value;
    localStorage.setItem("showHanaDSHeader", showHanaDSHeader.value.toString());

    const currentroute = route.currentRoute.value;

    if(currentroute.path !== '/') redirectToPage(currentroute.path);
  };

  const redirectToPage = (currentroute: String) => {
    if(showHanaDSHeader.value) {
      const toRoute = currentroute.replace("/without_keyboard", "");
      console.log(toRoute)
      const page = { path: `${toRoute}` };

      route.push(page);
    } else {
      console.log(currentroute)
      const page = { path: `${currentroute}/without_keyboard` };
      route.push(page);
    }
  };

</script>
<style lang="scss" scoped>
.nav {
  @apply flex w-full bg-base p-2 items-center gap-2;
  &-link {
    @apply text-center text-secondary bg-base border border-secondary rounded-full;

    &:last-child {
      @apply ml-auto;
    }

    &-logo {
      @apply flex justify-center px-4 py-2 items-center gap-2;

      &.active {
        @apply bg-secondary;
        
        & > svg {
          @apply invert-0;
        }

        &:hover > svg {
          @apply invert-0;
        }
      } 
      &:hover > svg {
          @apply invert-0;
        }
    }

    &-wrapper {
      @apply flex flex-col md:flex-row h-full overflow-hidden;

      & > a {
        @apply px-2 xs:px-4 py-2;
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
<template>
  <div class="charactergroup-circle">
    <div
      v-for="character in group.characters"
      :key="character.position"
      :class="active ? 'active' : ''"
      class="rounded-full text-center leading-[1rem] xs:leading-[3.5rem] sm:leading-[5.25rem]"
    >
      <Character :character="character.character" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Character from "@/components/Atoms/Character.vue";
import { characterGroup } from "@/types/characterGroup";

defineProps<{ group: characterGroup, active?: Boolean}>();
</script>

<style lang="scss" scoped>
@import "@/assets/scss/characterGroup.scss";
</style>
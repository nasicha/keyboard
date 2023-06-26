<template>
  <div class="charactergroup-circle">
    <div
      v-for="character in props.group.characters"
      :key="character.position"
      :class="props.active ? 'active' : ''"
      class="rounded-full text-center leading-[1.75rem] xs:leading-[3.25rem] sm:leading-[4.25rem]"
    >
      <Character :character="character.character" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Character from "@/components/Atoms/Character.vue";
import { characterGroup } from "@/types/characterGroup";

const props = defineProps<{ group: characterGroup, active?: Boolean}>();
</script>

<style lang="scss" scoped>
@import "@/assets/scss/utils.scss";
@import "@/assets/scss/baseColors.scss";
  
.charactergroup-circle {
  $item-count: 4;

  @media screen and (min-width: 641px) {
  $circle-size: 7.5em;
  $item-size: 4em;

  @include on-inner-circle($item-count, $circle-size, $item-size); 
}


  @media screen and (max-width: 640px) {
    $circle-size: 5.5rem;
    $item-size: 3.25rem;

    @include on-inner-circle($item-count, $circle-size, $item-size); 
  }

  @media screen and (max-width: 480px) {
    $circle-size: 3.5rem;
    $item-size: 2rem;

    @include on-inner-circle($item-count, $circle-size, $item-size); 
  }


  > div {
    top:  69%; 
    left: 69%;
    color: $base-color;
    border: 2px solid $base-color;
    background-color: $secondary-color;

    @media screen and (max-width: 640px) {
      top:  64%; 
      left: 64%;
    }

    @media screen and (max-width: 480px) {
      top:  69%; 
      left: 69%;
    }

    &.active {
      background: $base-color;
      border: 2px solid $secondary-color;
      color: $secondary-color;
    }
  }
}
</style>
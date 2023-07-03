<template>
  <div class="charactergroup-circle">
    <div
      v-for="character in props.group.characters"
      :key="character.position"
      :class="props.active ? 'active' : ''"
      class="rounded-full text-center leading-[1rem] xs:leading-[3.5rem] sm:leading-[5.25rem]"
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
  $circle-size: 8em;
  $item-size: 4.75em;

  @include on-inner-circle($item-count, $circle-size, $item-size); 
}


  @media screen and (max-width: 640px) {
    $circle-size: 5.75rem;
    $item-size: 3.5rem;

    @include on-inner-circle($item-count, $circle-size, $item-size); 
  }

  @media screen and (max-width: 480px) {
    $circle-size: 3.5rem;
    $item-size: 2rem;

    @include on-inner-circle($item-count, $circle-size, $item-size); 
  }


  > div {
    top:  65%; 
    left: 65%;
    color: $base-color;
    border: 2px solid $base-color;
    background-color: $secondary-color;

    @media screen and (max-width: 640px) {
      top:  61%; 
      left: 61%;
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
<template>
  <div class="charactergroup-circle">
    <div
      v-for="character in props.group.characters"
      :key="character.position"
      :class="props.active ? 'active' : ''"
      class="rounded-full text-center leading-[3.5rem] "
    >
      <Character :character="character.character" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Character from "@/components/Atoms/Character.vue";
import { characterGroup } from "@/types/characterGroup";

const props = defineProps<{ group: characterGroup, active?: Boolean }>();

</script>

<style lang="scss" scoped>
@import "@/assets/scss/utils.scss";
@import "@/assets/scss/baseColors.scss";
  
  .charactergroup-circle {
    @include on-inner-circle($item-count: 4, $circle-size: 5.5em, $item-size: 3.5em); 

    > div {
      top:  74%; 
      left: 74%;
      color: $base-color;
      border: 2px solid $base-color;
      background-color: $secondary-color;


      &.active {
        background: $base-color;
        border: 2px solid $secondary-color;
        color: $secondary-color;
      }
    }
  }
</style>
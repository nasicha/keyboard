<template>
  <div class="charactergroup-circle">
    <div
      v-for="character in props.group.characters"
      :key="character.position"
      class="border rounded-full text-center leading-[3rem]"
    >
      <Character :character="character.character" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Character from "@/components/Atoms/Character.vue";
import { characterGroup } from "@/types/characterGroup";

const props = defineProps<{ group: characterGroup }>();


</script>
<style lang="scss" scoped>
@import "@/assets/scss/utils.scss";
  
  .charactergroup-circle {
    @include on-inner-circle($item-count: 4, $circle-size: 5.75em, $item-size: 2.75em); 

    > div {
      top:  72%; 
      left: 72%;
    }
  }
</style>
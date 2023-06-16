<template>
  <div class="circle-container">
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
  @mixin on-circle($item-count, $circle-size, $item-size) {  
    position: relative;
    width:  $circle-size;
    height: $circle-size;
    border-radius: 50%;
    padding: 0; 
    list-style: none;
    
    > * {
      display: block;
      position: absolute;
      top:  69%; 
      left: 69%;
      margin: -(calc($item-size / 2));
      width:  $item-size;
      height: $item-size;
    
      $angle: (calc(360 / $item-count));
      $rot: -90;

      @for $i from 1 through $item-count {
        &:nth-of-type(#{$i}) {
          transform: rotate($rot * 1deg) translate(calc($circle-size / 2)) rotate($rot * -1deg);
        }

        $rot: $rot + $angle;
      }
    }
  }

  .circle-container {
    @include on-circle($item-count: 4, $circle-size: 6em, $item-size: 3em); 

    img { 
      display: block; 
      max-width: 20%; 
      border-radius: 50%;
      filter: grayscale(100%);
      border: solid 5px tomato;
      transition: .15s;
      
      &:hover {
        filter: grayscale(0);
      }
    }
  }
</style>
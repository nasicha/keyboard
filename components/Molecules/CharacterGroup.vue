<template>
  <div class="charactergroup-circle">
    <div
      v-for="character in group.characters"
      :key="character.position"
      :class="{ active: active }"
      class="rounded-full text-center leading-[1rem] sm:leading-[3.5rem] md:leading-[5.25rem]"
    >
      <Character :character="character.character" :class="{'text-base': toggleDirection === character.position}"          
         />
      <div :class="{
        'characterBg': true,
        [`characterBg-${character.position}`]: true,
        'characterBg-input': toggleDirection === character.position && active,
      }" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Character from "@/components/Atoms/Character.vue";
import { characterGroup } from "@/types/characterGroup";

const props = defineProps<{ group: characterGroup, inputCharacterPosition: number, active?: Boolean}>();

const toggleDirection = ref(0);

watch(() => props.inputCharacterPosition, (newValue) => {
  toggleDirection.value = newValue;
}
);

</script>

<style lang="scss" scoped>
@import "@/assets/scss/characterGroup.scss";
@import "@/assets/scss/characterBg.scss";


</style>
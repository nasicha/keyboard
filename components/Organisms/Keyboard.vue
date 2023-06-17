<template>
  <div class="max-w-screen-lg mx-auto overflow-hidden">
    <textarea 
      v-model="input" 
      class="w-full h-20 border rounded-md border-emerald-500 resize-none" 
      autofocus 
      readonly
    />

    <div class="w-full flex justify-center">
      <CharacterGroups :gamepad="gamepad" />
    </div>
    
    <GamepadInfo :gamepad="gamepad" />
  </div>
</template>

<script setup lang="ts">
import GamepadInfo from "@/components/Molecules/GamepadInfo.vue";
import CharacterGroups from "@/components/Molecules/CharacterGroups.vue";

import { mapGamepadToXbox360Controller } from "@vueuse/core";
import { toRefs } from "vue";

const props = defineProps<{ gamepad: Gamepad; showGamepad?: Boolean }>();

const { gamepad } = toRefs(props);
const controller = mapGamepadToXbox360Controller(gamepad);

const input = ref("");

input.value = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae diam eget nu";



watch(() => controller.value?.buttons, (buttons) => {
 

    if(buttons?.x.touched) {
      input.value = input.value.slice(0, -1);
    }

});



</script>

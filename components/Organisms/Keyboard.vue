<template>
  <div class="max-w-screen-lg mx-auto overflow-hidden">
    <textarea 
      v-model="input" 
      ref="inputField"
      class="w-full h-20 border rounded-md border-emerald-500 resize-none mb-4"  
      autofocus
    />

    <div class="w-full flex flex-col items-center">
      <CharacterGroups 
        :gamepad="gamepad"
        ref="characterGroup"
        />
    </div>
    
    <GamepadInfo v-if="hideGamepadInfo" :gamepad="gamepad" />
  </div>
</template>

<script setup lang="ts">
import GamepadInfo from "@/components/Molecules/GamepadInfo.vue";
import CharacterGroups from "@/components/Molecules/CharacterGroups.vue";
import { mapGamepadToXbox360Controller } from "@vueuse/core";
import { toRefs } from "vue";

const props = defineProps<{ gamepad: Gamepad; showGamepad?: Boolean }>();

// info & time variables
const hideGamepadInfo = ref(false);
const multiDeleteDelay = 800;
const multiDeleteSpeed = 100;

// input
const input = ref("");
const inputField = ref<HTMLTextAreaElement | null>(null);

// dummy input data
input.value = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae diam eget nu";

// controller
const { gamepad } = toRefs(props);
const controller = mapGamepadToXbox360Controller(gamepad);

// cursor
const cursorIndex = ref(input.value.length);

const placeCursor = () => {
  inputField.value?.setSelectionRange(cursorIndex.value, cursorIndex.value);
};


watch(() => controller.value?.bumper.left.pressed, (pressed) => {
  if (pressed && cursorIndex.value > 0) {
    cursorIndex.value--;
    placeCursor();
  }
});

watch(() => controller.value?.bumper.right.pressed, (pressed) => {
  if (pressed && cursorIndex.value < input.value.length) {
    cursorIndex.value++;
    placeCursor();
  }
});

// delete logic
const deleteCharacter = () => {
  if (cursorIndex.value === 0){
    return;
  }
  input.value = input.value.slice(0, cursorIndex.value-1) + input.value.slice(cursorIndex.value);
  cursorIndex.value--;
  setTimeout(() => {
      placeCursor();
    }, 0);
}

let timeID: string | number | NodeJS.Timeout | undefined, intervalID: string | number | NodeJS.Timeout | undefined;

watch(() => controller.value?.buttons.x.pressed, (value) => {
  if (value) {
    deleteCharacter();
    timeID = setTimeout(() => {
      if (controller.value?.buttons.x.pressed) {
        intervalID = setInterval(deleteCharacter, multiDeleteSpeed);
      } else {
        clearTimeout(timeID);
        clearInterval(intervalID);
      }
    }, multiDeleteDelay);
  } else {
    clearTimeout(timeID);
    clearInterval(intervalID);
  }
});
</script>

<template>
  <div class="w-full p-2 lg:max-w-screen-md mx-auto overflow-hidden">
    <textarea 
      v-model="input" 
      ref="inputField"
      @click="setCursor"
      class="w-full min-h-[4rem] p-2 border rounded-md border-black resize-none mb-8"  
      autofocus
    />

    <div class="w-full flex flex-col items-center">
      <CharacterGroups 
        :gamepad="gamepad"
        ref="characterGroup"
        @inputCharacter="addCharacter"
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

// input
const input = ref("");
const inputField = ref<HTMLTextAreaElement | null>(null);

// dummy input data
input.value = "Lorem ipsum dolor sit amet";

// controller
const { gamepad } = toRefs(props);
const controller = mapGamepadToXbox360Controller(gamepad);

/*
* textarea
*/
function updateTextareaHeight() {
  if(inputField.value === null) return;

  inputField.value.style.height = '';
  inputField.value.style.height = `${inputField.value.scrollHeight + 3}px`;
}

/*
* cursor
*/
const cursorIndex = ref(input.value.length);

const placeCursor = () => {
  inputField.value?.setSelectionRange(cursorIndex.value, cursorIndex.value);
};

const setCursor = () => {
  cursorIndex.value = inputField.value?.selectionStart ? inputField.value?.selectionStart : cursorIndex.value;
};

const incrementCursor = () => {
  // TODO fix cursorIndex.value when input has emojis
  cursorIndex.value++;
  placeCursor();
};

const decrementCursor = () => {
  // TODO fix cursorIndex.value when input has emojis
  cursorIndex.value--;
  placeCursor();
};

const multiCursorDelay = 800;
const multiCursorSpeed = 100;

let cursorLeftTimeID: string | number | NodeJS.Timeout | undefined, cursorLeftIntervalID: string | number | NodeJS.Timeout | undefined;

watch(() => controller.value?.bumper.left.pressed, (pressed) => {
  if (pressed && cursorIndex.value > 0) {
    decrementCursor();

    cursorLeftTimeID = setTimeout(() => {
      if (controller.value?.bumper.left.pressed && cursorIndex.value > 0) {
        cursorLeftIntervalID = setInterval(decrementCursor, multiCursorSpeed);
      } else {
        clearTimeout(cursorLeftTimeID);
        clearInterval(cursorLeftIntervalID);
      }
    }, multiCursorDelay);
  } else {
    clearTimeout(cursorLeftTimeID);
    clearInterval(cursorLeftIntervalID);
  }
});

let cursorRightTimeID: string | number | NodeJS.Timeout | undefined, cursorRightIntervalID: string | number | NodeJS.Timeout | undefined;

watch(() => controller.value?.bumper.right.pressed, (pressed) => {
  if (pressed && cursorIndex.value < input.value.length) {
    incrementCursor();

    cursorRightTimeID = setTimeout(() => {
      if (controller.value?.bumper.right.pressed && cursorIndex.value < input.value.length) {
        cursorRightIntervalID = setInterval(incrementCursor, multiCursorSpeed);
      } else {
        clearTimeout(cursorRightTimeID);
        clearInterval(cursorRightIntervalID);
      }
    }, multiCursorDelay);
  } else {
    clearTimeout(cursorRightTimeID);
    clearInterval(cursorRightIntervalID);
  }
});

/*
* input logic
*/
const addCharacter = (character: string) => {
  input.value = input.value.slice(0, cursorIndex.value) + character + input.value.slice(cursorIndex.value);
  cursorIndex.value += character.length;
  setTimeout(() => {
    updateTextareaHeight();
    placeCursor();
  }, 0);
};

/*
* delete logic
*/
const multiDeleteDelay = 800;
const multiDeleteSpeed = 100;

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

let deleteTimeID: string | number | NodeJS.Timeout | undefined, deleteIntervalID: string | number | NodeJS.Timeout | undefined;

watch(() => controller.value?.buttons.x.pressed, (value) => {
  if (value) {
    deleteCharacter();
    deleteTimeID = setTimeout(() => {
      if (controller.value?.buttons.x.pressed) {
        deleteIntervalID = setInterval(deleteCharacter, multiDeleteSpeed);
      } else {
        clearTimeout(deleteTimeID);
        clearInterval(deleteIntervalID);
      }
    }, multiDeleteDelay);
  } else {
    clearTimeout(deleteTimeID);
    clearInterval(deleteIntervalID);
  }
});
</script>

<template>
  <div class="w-full px-2 md:max-w-screen-md mx-auto overflow-hidden">
    <span v-html="dummy" class="w-full h-auto p-2 resize-none" disabled/>
    <textarea 
      v-model="input" 
      ref="inputField"
      @click="placeCursor"
      class="w-full min-h-[4rem] p-2 border rounded-md border-base resize-none mb-4"  
      autofocus
    />

    <div class="w-full flex flex-col">
      <CharacterGroups 
        :gamepad="gamepad"
        :animate="animate"
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
import { timeIntervalHelper } from "@/types/timeIntervalHelper";
import { mapGamepadToXbox360Controller } from "@vueuse/core";
import { toRefs } from "vue";

const props = defineProps<{ gamepad: Gamepad; showGamepad?: Boolean }>();

// info & time variables
const hideGamepadInfo = ref(false);
const animate = reactive<{ [key: string]: boolean }>({
  animateDelete: false,
  animateCursorRight: false,
  animateCursorLeft: false,
});

const multiDelay = 600;
const multiSpeed = 100;

// input
const input = ref("");
const inputArray = ref<string[]>([]);
const inputField = ref<HTMLTextAreaElement | null>(null);

// dummy input data
const dummy = "Lorem ipsum dolor sit amet";
inputArray.value = input.value.split("");

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
const inputArrayIndex = ref(inputArray.value.length);

const placeCursor = () => {
  inputField.value?.setSelectionRange(cursorIndex.value, cursorIndex.value);
};

const incrementCursor = () => {
  if(inputArrayIndex.value < inputArray.value.length) {
    inputArrayIndex.value++;
    cursorIndex.value += inputArray.value[inputArrayIndex.value-1].length;
    placeCursor();
  }
};

const decrementCursor = () => {
  if(inputArrayIndex.value > 0) {
    inputArrayIndex.value--;
    cursorIndex.value -= inputArray.value[inputArrayIndex.value].length;
    placeCursor();
  }
};

let cursorLeftTimeID: timeIntervalHelper, cursorLeftIntervalID: timeIntervalHelper;

watch(() => controller.value?.bumper.left.pressed, (pressed) => {
  if (pressed && inputArrayIndex.value > 0) {
      decrementCursor();
      animate.animateCursorLeft = true;

    cursorLeftTimeID = setTimeout(() => {
      if (controller.value?.bumper.left.pressed && inputArrayIndex.value > 0 && cursorLeftIntervalID === undefined) {
        cursorLeftIntervalID = setInterval(decrementCursor, multiSpeed);
      } else {
        clearTimeout(cursorLeftTimeID);
        clearInterval(cursorLeftIntervalID);
        cursorLeftIntervalID = undefined;
      }
    }, multiDelay);
  } else {
    animate.animateCursorLeft = false;
    clearTimeout(cursorLeftTimeID);
    clearInterval(cursorLeftIntervalID);
    cursorLeftIntervalID = undefined;
  }
});

let cursorRightTimeID: timeIntervalHelper, cursorRightIntervalID: timeIntervalHelper;

watch(() => controller.value?.bumper.right.pressed, (pressed) => {
  if (pressed && inputArrayIndex.value < inputArray.value.length) {
    incrementCursor();
    animate.animateCursorRight = true;

    cursorRightTimeID = setTimeout(() => {
      if (controller.value?.bumper.right.pressed && inputArrayIndex.value < inputArray.value.length && cursorRightIntervalID === undefined) {
        cursorRightIntervalID = setInterval(incrementCursor, multiSpeed);
      } else {
        clearTimeout(cursorRightTimeID);
        clearInterval(cursorRightIntervalID);
        cursorRightIntervalID = undefined;
      }
    }, multiDelay);
  } else {
    animate.animateCursorRight = false;
    clearTimeout(cursorRightTimeID);
    clearInterval(cursorRightIntervalID);
    cursorRightIntervalID = undefined;
  }
});

/*
* input logic
*/
const addCharacter = (character: string) => {
  inputArray.value.splice(inputArrayIndex.value, 0, character);
  input.value = inputArray.value.join("");
  inputArrayIndex.value++;
  cursorIndex.value += character.length;

  setTimeout(() => {
    updateTextareaHeight();
    placeCursor();
  }, 0);
};


/*
* delete logic
*/
const deleteCharacter = () => {
  animate.animateDelete = true;

  if (cursorIndex.value === 0){
    return;
  }

  let characterLength = inputArray.value[inputArrayIndex.value-1].length;
  
  inputArray.value.splice(inputArrayIndex.value-1, 1);
  input.value = inputArray.value.join("");
  inputArrayIndex.value--;
  cursorIndex.value -= characterLength;

  setTimeout(() => {
      placeCursor();
    },
    0);

}

let deleteTimeID: timeIntervalHelper, deleteIntervalID: timeIntervalHelper;

watch(() => controller.value?.buttons.x.pressed, (pressed) => {
  if (pressed) {
    deleteCharacter();

    deleteTimeID = setTimeout(() => {
      if (controller.value?.buttons.x.pressed) {
        deleteIntervalID = setInterval(deleteCharacter, multiSpeed);
      } else {
        clearTimeout(deleteTimeID);
        clearInterval(deleteIntervalID);
      }
    }, multiDelay);
  } else {
    animate.animateDelete = false;
    clearTimeout(deleteTimeID);
    clearInterval(deleteIntervalID);
  }
});
</script>

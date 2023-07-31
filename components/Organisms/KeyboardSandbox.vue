<template>
  <textarea 
    v-model="input" 
    ref="inputField"
    @click="setCursor"
    class="w-full min-h-[4rem] p-2 border rounded-md border-base resize-none mb-4"  
  />
  <div v-if="showHanaDS" class="w-full flex flex-col">
    <Keyboard 
      :gamepad="props.gamepad"
      :animate="animate"
      ref="characterGroup"
      @inputCharacter="addCharacter"
      />
  </div>
  <div v-else class="absolute bottom-0 right-0 m-8">
    <div class="flex items-center p-2 border border-base rounded-full">
      <DpadDown class="h-8 w-8 fill-base"/>
      <span>Show Hana DS</span>
    </div>
  </div>
</template>

<script setup lang="ts">  
import Keyboard from "@/components/Molecules/Keyboard.vue";
import DpadDown from "@/assets/icons/xbox_dpad_down.svg?component";
import { timeIntervalHelper } from "@/types/timeIntervalHelper";
import { mapGamepadToXbox360Controller } from "@vueuse/core";
import { toRefs } from "vue";

const props = defineProps<{ gamepad: Gamepad; showGamepad?: boolean }>();

// time & animation variables
const multiDelay = 600;
const multiSpeed = 100;

const animate = reactive<{ [key: string]: boolean }>({
  animateDelete: false,
  animateCursorRight: false,
  animateCursorLeft: false,
});


// input
const input = ref("");
const inputArray = ref<string[]>([]);
const inputField = ref<HTMLTextAreaElement | null>(null);

onMounted(() => {
  inputField.value?.focus();
});

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

const setCursor = () => {
  let sum = 0;
  const lastIndex = inputArray.value.map((str, index) => {
    sum += str.length;
    return { index, sum };
  }).findLastIndex(obj => obj.sum <= inputField.value!.selectionStart || 0);

  inputArrayIndex.value = lastIndex+1;
  cursorIndex.value = inputField.value?.selectionStart || 0;
}

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
  if (pressed) {
      animate.animateCursorLeft = true;

      if(inputArrayIndex.value == 0) return;
      decrementCursor();

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
  if (pressed) {
    animate.animateCursorRight = true;

    if(inputArrayIndex.value == inputArray.value.length) return;
    incrementCursor();

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

/*
* hide hana ds
*/
const showHanaDS = ref(true);

onMounted(() => {
  if (localStorage.getItem("showHanaDS")) {
    showHanaDS.value = localStorage.getItem("showHanaDS") === "true";
  }
});

watch(() => controller.value?.dpad.down.pressed, (pressed) => {
  if(pressed) {
    showHanaDS.value = !showHanaDS.value;
    localStorage.setItem("showHanaDS", showHanaDS.value.toString());
  }
});
</script>

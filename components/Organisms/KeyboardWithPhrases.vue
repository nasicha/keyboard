<template>
  <div class="flex flex-col">
    <div class="w-full h-auto px-2 pb-2 flex justify-between">
      <span
        v-html="phrase" 
        class="resize-none w-full"
      />
      <div 
        v-if="props.phrases.length > 1" 
        class="flex items-center gap-2"
      >
        <span class="text-background">{{ phrasesIndex+1 }}/{{ props.phrases.length }}</span>
        <IconStart class="h-6 w-6 rounded-full stroke-base stroke-[4]" :class="{ [`invert`]: animateStart }" />
      </div>
    </div>
    <div class="relative mb-4">
      <input 
        v-model="input" 
        ref="inputField"
        @keyup.enter="submitPhrase"
        @click="setCursor"
        class="relative z-10 bg-transparent w-full p-2 border rounded-md border-base resize-none outline-none"  
      />
      <div 
        class="absolute top-0 left-0 w-full h-full z-0 border rounded-md border-base opacity-60"
        :class="{ phrase__correct: animatePhraseState === 1, phrase__wrong: animatePhraseState === 2}" />
    </div>
  </div>

  <div v-if="showHanaDS" class="w-full flex flex-col" >
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
import IconStart from "@/assets/icons/xbox_button_start.svg?component";
import DpadDown from "@/assets/icons/xbox_dpad_down.svg?component";
import { timeIntervalHelper } from "@/types/timeIntervalHelper";
import { mapGamepadToXbox360Controller } from "@vueuse/core";
import { toRefs } from "vue";

const props = defineProps<{ gamepad: Gamepad; phrases: string[]; showHanaDS?: boolean }>();

// time & animation variables
const multiDelay = 500;
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
const phrase = ref(dummy);
phrase.value = props.phrases[0] || dummy;

inputArray.value = input.value.split("");

// controller
const { gamepad } = toRefs(props);
const controller = mapGamepadToXbox360Controller(gamepad);

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
* phrase logic
*/
const phrasesIndex = ref(0);
const animateStart = ref(false);
const animatePhraseState = ref(0);

const nextPhrase = () => {
  phrasesIndex.value = (phrasesIndex.value + 1) % props.phrases.length;
  phrase.value = props.phrases[phrasesIndex.value];
}

const cleanInput = () => {
  input.value = "";
  inputArray.value = [];
  inputArrayIndex.value = 0;
  cursorIndex.value = 0;
  animatePhraseState.value = 0;
  animateStart.value = false;
}

const submitPhrase = () => {
  if(props.phrases.length <= 1) return;

  if(input.value === phrase.value) {
    animatePhraseState.value = 1;
    setTimeout(() => {
      animatePhraseState.value = 0;
      cleanInput();
      nextPhrase();
    }, 1000);
  } else {
    animatePhraseState.value = 2;
    setTimeout(() => {
      animatePhraseState.value = 0;
    }, 1000);
  }
}

watch(() => controller.value?.start.touched, (touched) => {
  if(touched) {
    animateStart.value = true;
    submitPhrase();
  } else {
    animateStart.value = false;
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
<style lang="scss" scoped>
.phrase {
  &__correct, &__wrong {
    @apply animate-[pulse_750ms_ease-in-out_infinite];
  }
  &__correct {
    @apply bg-phrase-correct;
  }
  &__wrong {
    @apply bg-phrase-wrong;
  }
}
</style>

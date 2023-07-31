<template>
    <div class="flex flex-col">
    <div class="w-full h-auto px-2 pb-2 flex justify-between">
      <span
        v-html="phrase" 
        class="resize-none w-full"
      />
      <div 
        v-if="phrases.length > 1" 
        class="flex items-center gap-2"
      >
        <span class="text-background">{{ phrasesIndex+1 }}/{{ phrases.length }}</span>
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
</template>

<script setup lang="ts">
import { useGamepad } from "@vueuse/core";
import Infotable from "~/components/Molecules/Infotable.vue";
import Alert from "~/components/Molecules/Alert.vue";


const input = ref("");
const inputArray = ref<string[]>([]);
const inputField = ref<HTMLTextAreaElement | null>(null);

onMounted(() => {
  inputField.value?.focus();
});

/*
* phrase logic
*/
const phrasesIndex = ref(0);
const animateStart = ref(false);
const animatePhraseState = ref(0);

const phrases = ref<string[]>([]);
phrases.value.push("The quick brown fox jumps over the lazy dog.")
const phrase = ref("");
phrase.value = phrases.value[phrasesIndex.value];

const nextPhrase = () => {
  phrasesIndex.value = (phrasesIndex.value + 1) % phrases.value.length;
  phrase.value = phrases.value[phrasesIndex.value];
}

const cleanInput = () => {
  input.value = "";
  inputArray.value = [];
  animatePhraseState.value = 0;
  animateStart.value = false;
}

const submitPhrase = () => {
  if(phrases.value.length <= 1) return;

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
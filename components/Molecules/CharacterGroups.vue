<template>
  <div class="charactergroups-circle mb-8">
    <div
      v-for="group in charGroups"
      :key="group.key"
      class="charactergroup transition-all duration-100 ease-in-out"
      :class="Number(group.key) === charGroup ? 'active' : ''"
    >
      <CharacterGroup :key="update" :group="group" :active="Number(group.key) === charGroup"/>
    </div>
    <div
      v-for="n in 7"
      class="charactergroup_pedals" 
    />
  </div>
  <div class="max-w-screen-sm w-full flex flex-row flex-wrap gap-3 justify-between">
    <span class="border-2 rounded-full text-3xl px-4 py-2 mr-4" :class="shiftState === 0 ? '' : 'bg-black text-white border-black'">{{ shiftSymbol }}</span>
    <span 
      v-for="(symbol, index) in layoutSymbol"
      v-key="index"
      class=" min-w-[70px] border-2 rounded-full text-3xl px-4 py-2 text-center"
      :class="layoutState === index ? 'bg-black text-white border-black' : ''"
    >
      {{ layoutState === index && shiftState !== 0 ? symbol.shiftValue : symbol.value }}
    </span>
    <button 
      @click="toggleCharacterData" 
      v-html="useAlphabetic ? 'Use QWERTY-like' : 'Use Alphabetic'"
      class="ml-auto"
    />
  </div>
</template>

<script lang="ts" setup>
import CharacterGroup from "@/components/Molecules/CharacterGroup.vue";
import { mapGamepadToXbox360Controller } from "@vueuse/core";

const props = defineProps<{ gamepad: Gamepad }>();

const update = ref(0);
const layoutState = ref(0)
const useAlphabetic = ref(localStorage.getItem('alphabetical') === 'true');

/*
* update character data
*/
const { characterGroups } = useCharacterData(false, useAlphabetic.value, layoutState.value);
const charGroups = ref(characterGroups);

onMounted(() => {
  if (localStorage.getItem('alphabetical')) {
    useAlphabetic.value = localStorage.getItem('alphabetical') === 'true';
  }
});

/*
* controller
*/
const { gamepad } = toRefs(props);
const controller = mapGamepadToXbox360Controller(gamepad);

/*
* shift character data
*/
const shiftState = ref(0);
const shiftSymbol = ref('⇧');

const getShiftState = () => {
  return shiftState.value === 0 ? false : true;
}

const updateCharacterData = () => {
  charGroups.value = useCharacterData(getShiftState(), useAlphabetic.value, layoutState.value).characterGroups;
  update.value++;
}

watch(() => controller.value?.stick.left.button.pressed, (pressed) => {
  if (pressed) {
    shiftState.value = (shiftState.value + 1) % 3;
    if(shiftState.value === 2) {
      shiftSymbol.value = '⇪';
    } else {
      shiftSymbol.value = '⇧';
    }

    updateCharacterData();
  }
});

/*
* left stick logic
*/
const charGroup = ref(0);

const characterGroupPosition = (x: number, y: number) => {
  charGroup.value = useLeftStick(x, y);
};

watch(() => controller.value?.stick.left, (left) => {
  let x = left?.horizontal ? left?.horizontal : 0;
  let y = left?.vertical ? left?.vertical : 0;
  characterGroupPosition(x, y);
});

/*
* right stick logic
*/
const inputCharacter = ref();

const setInputCharacter = (x: number, y: number) => {
  inputCharacter.value = useRightStick(x, y, charGroup.value);
};

watch(() => controller.value?.stick.right, (right) => {
  let x = right?.horizontal ? right?.horizontal : 0;
  let y = right?.vertical ? right?.vertical : 0;
  setInputCharacter(x, y);
});


const emits = defineEmits(["inputCharacter"]);

watch(inputCharacter, (position) => {
  if(position === undefined || position === 0 || position > 4) return;
  
  let characters = charGroups.value[charGroup.value].characters[position - 1];
  let character = characters.character;

  if(shiftState.value === 1){
    character = characters.shiftedCharacter;
    
    shiftState.value = 0;
  } else if(shiftState.value === 2){
    character = characters.shiftedCharacter;
  }
  updateCharacterData();
  emits("inputCharacter", character);
});

/*
* toggle layout
*/
const layoutSymbol = ref([{ value: 'abc', shiftValue: 'ABC'}, { value: '123', shiftValue: '?!%'}, { value: '☻', shiftValue: '★'}]);

watch(() => controller.value?.triggers.left.pressed, (pressed) => {
  if(pressed) {
    layoutState.value = (layoutState.value + 1) % 3;
  
  shiftState.value = 0;
  updateCharacterData();
  }
});

/*
* toggle character
*/
const toggleCharacterData = () => {
  useAlphabetic.value = !useAlphabetic.value;
  localStorage.setItem('alphabetical', useAlphabetic.value.toString());
  
  updateCharacterData();
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/characterGroups.scss";

  // pedals
  .charactergroup_pedals {
    position: absolute;
    width: 200px;
    height: 200px;
    padding: 1rem;
    background: $background-color;
    border-radius: 50%;
    z-index: 0;

    &:last-of-type {
      width: 300px;
      height: 300px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      
    }

    $item-count: 6;
    $angle: (calc(360 / $item-count));
    $rot: 0;

    @media screen and (min-width: 641px) {
      $circle-size: 25rem;

      @for $i from 8 through calc(($item-count*2) + 1) {
        &:nth-of-type(#{$i}) {
          border: 2px solid rgba($base-color, 0.2);
          transform: rotate($rot * 1deg) translate(calc($circle-size / 2)) rotate($rot * -1deg);
        }

        $rot: $rot + $angle;
      }
    }

    @media screen and (max-width: 640px) {
      $circle-size: 20rem;
      width: 150px;
      height: 150px;

      @for $i from 8 through calc(($item-count*2) + 1) {
        &:nth-of-type(#{$i}) {
          border: 2px solid rgba($base-color, 0.2);
          transform: rotate($rot * 1deg) translate(calc($circle-size / 2)) rotate($rot * -1deg);
        }

        $rot: $rot + $angle;
      }
    }

    @media screen and (max-width: 480px) {

      &:last-of-type {
        width: 200px;
        height: 200px;
      }

      $circle-size: 12.5rem;
      width: 95px;
      height: 95px;
      padding: 0.5rem;

      @for $i from 8 through calc(($item-count*2) + 1) {
        &:nth-of-type(#{$i}) {
          border: 2px solid rgba($base-color, 0.2);
          transform: rotate($rot * 1deg) translate(calc($circle-size / 2)) rotate($rot * -1deg);
        }

        $rot: $rot + $angle;
      }
    }
  }
</style>

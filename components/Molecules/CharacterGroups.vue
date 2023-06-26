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
  </div>
  <div class="flex flex-row justify-around max-w-screen-xs w-full">
    <span class="border-2 rounded-full text-3xl px-4 py-2 mr-4">{{ layoutSymbol }}</span>
    <span class="border-2 rounded-full text-3xl px-4 py-2" :class="shiftState === 0 ? '' : 'bg-black text-white border-black'">{{ shiftSymbol }}</span>
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

/*
* update character data
*/
const update = ref(0);

const useAlphabetic = ref(false)
const layoutState = ref(0)
const { characterGroups } = useCharacterData(false, useAlphabetic.value, layoutState.value);
const charGroups = ref(characterGroups);

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

// Composable function to be executed whenever charGroup changes
const characterGroupPosition = (x: number, y: number) => {
  charGroup.value = useLeftStick(x, y);
};

watch(() => controller.value?.stick.left, () => {
  let x = controller.value?.stick.left.horizontal ? controller.value?.stick.left.horizontal : 0;
  let y = controller.value?.stick.left.vertical ? controller.value?.stick.left.vertical : 0;
  characterGroupPosition(x, y);
});

/*
* right stick logic
*/
const inputCharacter = ref();

const setInputCharacter = (x: number, y: number) => {
  inputCharacter.value = useRightStick(x, y, charGroup.value);
};

watch(() => controller.value?.stick.right, () => {
  let x = controller.value?.stick.right.horizontal ? controller.value?.stick.right.horizontal : 0;
  let y = controller.value?.stick.right.vertical ? controller.value?.stick.right.vertical : 0;
  setInputCharacter(x, y);
});


const emits = defineEmits(["inputCharacter"]);

watch(inputCharacter, (position) => {
  if(position === undefined || position === 0 || position > 4) return;
  
  let character = charGroups.value[charGroup.value].characters[position - 1].character;

  if(shiftState.value === 1){
    character = character.toUpperCase();
    shiftState.value = 0;
  } else if(shiftState.value === 2){
    character = character.toUpperCase();
  }
  updateCharacterData();

  emits("inputCharacter", character);
});

/*
* toggle layout
*/
const layoutSymbol = ref('123');

watch(() => controller.value?.triggers.left.pressed, (pressed) => {
  if(pressed) {
    layoutState.value = (layoutState.value + 1) % 3;
  if(layoutState.value === 0) {
    layoutSymbol.value = '123';
  } else if(layoutState.value === 1) {
    layoutSymbol.value = '☺';
  } else {
    layoutSymbol.value = 'abc';
  }
  
  shiftState.value = 0;
  updateCharacterData();
  }
});

/*
* toggle character
*/
const toggleCharacterData = () => {
  useAlphabetic.value = !useAlphabetic.value;
  charGroups.value = useCharacterData(getShiftState(), useAlphabetic.value, layoutState.value).characterGroups;
  update.value++;
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/baseColors.scss";
.charactergroups-circle {
  position: relative;
  max-width: 100%;
  border-radius: 100%;
  background: $background-color;

  @media screen and (min-width: 641px) {
    width: 640px;
    height: 640px;
    padding: 220px;
  }

  @media screen and (max-width: 640px) {
    width: 480px;
    height: 480px;
    padding: 165px;
  }

  @media screen and (max-width: 480px) {
    width: 300px;
    height: 300px;
    padding: 102px;
  }
}

.charactergroup {
  position: absolute;
  width: 200px;
  height: 200px;
  padding: 1rem;
  border-radius: 100%;
  border: 2px solid $base-color;
  color: $base-color;
  background-color: $secondary-color;

  
  &.active {
    border: 2px solid $base-color;
    background: $base-color;
    color: $secondary-color;
  }

  &:first-of-type {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  $item-count: 6;
  $angle: (calc(360 / $item-count));
  $rot: -90;

  @media screen and (min-width: 641px) {
    $circle-size: 27rem;

    @for $i from 2 through calc($item-count + 1) {
      &:nth-of-type(#{$i}) {
        transform: rotate($rot * 1deg) translate(calc($circle-size / 2)) rotate($rot * -1deg);
      }

      $rot: $rot + $angle;
    }
  }

  @media screen and (max-width: 640px) {
    width: 150px;
    height: 150px;

    $circle-size: 20rem;

    @for $i from 2 through calc($item-count + 1) {
      &:nth-of-type(#{$i}) {
        transform: rotate($rot * 1deg) translate(calc($circle-size / 2)) rotate($rot * -1deg);
      }

      $rot: $rot + $angle;
    }
  }

  @media screen and (max-width: 480px) {
    width: 95px;
    height: 95px;
    padding: 0.5rem;

    $circle-size: 12.5rem;

    @for $i from 2 through calc($item-count + 1) {
      &:nth-of-type(#{$i}) {
        transform: rotate($rot * 1deg) translate(calc($circle-size / 2)) rotate($rot * -1deg);
      }

      $rot: $rot + $angle;
    }
  }
}
</style>

<template>
  <div class="charactergroups-circle">
    <div
      v-for="group in charGroups"
      :key="group.key"
      class="charactergroup transition-all duration-100 ease-in-out"
      :class="Number(group.key) === charGroup ? 'active' : ''"
    >
      <CharacterGroup :key="update" :group="group" :active="Number(group.key) === charGroup"/>
    </div>
  </div>    
  <button 
    @click="toggleCharacterData" 
    v-html="useAlphabetic ? 'Use QWERTY-like' : 'Use Alphabetic'"
    class="ml-auto hover:text-white hover:bg-black"
  />
</template>

<script lang="ts" setup>
import CharacterGroup from "@/components/Molecules/CharacterGroup.vue";
import { mapGamepadToXbox360Controller } from "@vueuse/core";

const props = defineProps<{ gamepad: Gamepad }>();

// update character data
const update = ref(0);

const useAlphabetic = ref(false)
const { characterGroups } = useCharacterData(useAlphabetic.value);
const charGroups = ref(characterGroups);

// controller
const { gamepad } = toRefs(props);
const controller = mapGamepadToXbox360Controller(gamepad);

// left stick logic
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

// right stick logic
// TODO!!!!!

// shift character logic


// shift character data
const useShift = ref(false)

const shiftCharacterData = () => {
  useShift.value = !useShift.value;
  charGroups.value = useCharacterData(useShift.value, useAlphabetic.value).characterGroups;
  update.value++;
}

watch(() => controller.value?.stick.left.button.pressed, (pressed) => {
  if (pressed) {
    shiftCharacterData();
  }
});

// toggle character data
const toggleCharacterData = () => {
  useAlphabetic.value = !useAlphabetic.value;
  charGroups.value = useCharacterData(useShift.value, useAlphabetic.value).characterGroups;
  update.value++;
}
</script>

<style lang="scss" scoped>
.charactergroups-circle {
  position: relative;
  max-width: 100%;
  width: 500px;
  height: 500px;
  padding: 175px;
}

.charactergroup {
  position: absolute;
  width: 150px;
  height: 150px;
  padding: 0.5rem;
  border-radius: 100%;
  border: 2px solid black;
  
  &.active {
    background: black;
    color: white;
  }

  &:first-of-type {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

  }

  $item-count: 6;
  $circle-size: 20rem;
  $angle: (calc(360 / $item-count));
  $rot: -90;

  @for $i from 2 through calc($item-count + 1) {
    &:nth-of-type(#{$i}) {
      transform: rotate($rot * 1deg) translate(calc($circle-size / 2)) rotate($rot * -1deg);
    }

    $rot: $rot + $angle;
  }
}
</style>

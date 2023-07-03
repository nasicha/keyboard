<template>
  <div class="charactergroups-circle mb-12">
    <div
      v-for="group in charGroups"
      :key="group.key"
      class="charactergroup transition-all duration-100 ease-in-out"
      :class="Number(group.key) === charGroup ? 'active shadow-xl' : 'shadow-sm'"
    >
      <CharacterGroup :key="update" :group="group" :active="Number(group.key) === charGroup"/>
      <div 
        class="cross" 
        :class="Number(group.key) === charGroup ? 'before:bg-white after:bg-white' : 'before:bg-black after:bg-black'"
      ></div>
    </div>
    <div
      v-for="n in 7"
      class="charactergroup-pedals" 
    />
  </div>
  <div class="max-w-screen-sm w-full flex flex-row flex-wrap gap-3 justify-between items-center">
    <div class="gamepad-button min-w-[11rem] justify-center" :class="shiftState === 0 ? '' : 'gamepad-button-selected'">
      <span class="gamepad-icon">e</span>
      <span class="text-3xl mr-2" >{{ shiftSymbol }}</span>
      <span>{{ shiftState !== 0 ? layoutSymbol[layoutState].shiftValue : layoutSymbol[layoutState].value }}</span>
    </div>
    <div class="gamepad-button">
      <span class="gamepad-icon">k</span>
      <span>{{ layoutSymbol[layoutState].nextValue }}</span>
    </div>
    <div class="gamepad-button">
      <span class="gamepad-icon">b</span>
      <span class="text-3xl font-bold -mt-4">␣</span>
    </div>
    <div class="gamepad-button">
      <span class="gamepad-icon">Q</span>
      <span class="text-3xl">⌫</span>
    </div>
    <div class="gamepad-button min-w-[180px]">
      <span class="gamepad-icon">O</span>
      <span class="text-xl">{{ useAlphabetic ? 'QWERTY-like' : 'Alphabetic' }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CharacterGroup from "@/components/Molecules/CharacterGroup.vue";
import { mapGamepadToXbox360Controller } from "@vueuse/core";
import { useCharacterData, useCharacterDataLayout } from "@/composables/useData";

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
* toggle layout (left trigger)
*/
const layoutSymbol = useCharacterDataLayout();

watch(() => controller.value?.triggers.left.pressed, (pressed) => {
  if(pressed) {
    layoutState.value = (layoutState.value + 1) % 3;
    shiftState.value = 0;
    updateCharacterData();
  }
});

/*
* toggle character (dpad up)
*/
const toggleCharacterData = () => {
  useAlphabetic.value = !useAlphabetic.value;
  localStorage.setItem('alphabetical', useAlphabetic.value.toString());
  
  updateCharacterData();
}

watch(() => controller.value?.dpad.up.pressed, (pressed) => {
  if(pressed) {
    toggleCharacterData();
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/characterGroups.scss";

.gamepad{
  &-button {
    @apply flex min-w-[6rem] border-2 text-3xl rounded-xl px-4 py-2 mr-4 justify-between items-center;

    &-selected {
      background-color: base-color;
      border-color: base-color;
      color: secondary-color;
    }
  }

  &-icon {
    @apply font-icon text-3xl mr-1 opacity-70;
  }
}


.cross {
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 11px;
  height: 210px;
}
.cross:before, .cross:after {
  position: absolute;
  left: 15px;
  content: ' ';
  height: 210px;
  width: 2px;
}
.cross:before {
  transform: rotate(45deg);
}
.cross:after {
  transform: rotate(-45deg);
}
</style>

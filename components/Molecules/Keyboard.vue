<template>
  <div class="info info-top">
    <div class="info-wrapper" :class="{ animatePress: animateLayout }">
      <span class="md:text-3xl">{{ layoutSymbol[layoutState].nextValue }}</span>
      <IconLT class="info-icon" />
    </div>
    <div class="info-wrapper" :class="{ animatePress: animateSpace }">
      <span class="info-text font-bold">␣</span>
      <IconRT class="info-icon" />
    </div>
  </div>
  <div class="charactergroups-circle">
    <div
      v-for="group in charGroups"
      :key="group.key"
      class="charactergroup"
      :class="Number(group.key) === charGroup ? 'active shadow-xl' : 'shadow-md'"
    >
      <CharacterGroup
        :key="update"
        :group="group"
        :inputCharacterPosition="animateCharacterPosition"
        :active="Number(group.key) === charGroup"
        :shiftState="shiftState"
      />
      <div
        class="cross"
        :class="
          Number(group.key) === charGroup
            ? 'before:bg-secondary after:bg-secondary'
            : 'before:bg-base after:bg-base'
        "
      />
    </div>
    <div v-for="n in 7" class="charactergroup-pedals" />
  </div>
  <div class="info info-bottom">
    <div class="info-wrapper" :class="shiftState === 0 ? '' : 'info-wrapper-selected'">
      <span class="info-text info-text-shift">{{ shiftSymbol }}</span>
      <IconClickL class="info-icon" />
    </div>
    <div class="info-wrapper" :class="{ animatePress: props.animate.animateDelete }">
      <span class="info-text">⌫</span>
      <IconX class="info-icon" />
    </div>
  </div>
<div class="info info-bottom-mid">
    <div class="info-wrapper" :class="{ animatePress: props.animate.animateCursorLeft }">
      <span class="info-text">{{ '<' }}</span>
      <IconLB class="info-icon" />
    </div>
    <div class="info-wrapper" :class="{ animatePress: props.animate.animateCursorRight }">
      <span class="info-text">{{ '>' }}</span>
      <IconRB class="info-icon" />
    </div>    
</div>
</template>

<script lang="ts" setup>
import CharacterGroup from "@/components/Molecules/CharacterGroup.vue";
import { mapGamepadToXbox360Controller } from "@vueuse/core";
import { useCharacterData, useCharacterDataLayout } from "@/composables/useData";
import IconRT from "@/assets/icons/xbox_trigger_rt.svg?component";
import IconRB from "@/assets/icons/xbox_bumper_rb.svg?component";
import IconLT from "@/assets/icons/xbox_trigger_lt.svg?component";
import IconLB from "@/assets/icons/xbox_bumper_lb.svg?component";
import IconClickL from "@/assets/icons/xbox_click_l.svg?component";
import IconX from "@/assets/icons/xbox_button_x.svg?component";

const props = defineProps<{ gamepad: Gamepad; animate: { [key: string]: boolean } }>();

const update = ref(0);
const layoutState = ref(0);

/*
 * update character data
 */
const { characterGroups } = useCharacterData(
  false,
  layoutState.value
);
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
const shiftSymbol = ref("⇧");

const getShiftState = () => {
  return shiftState.value === 0 ? false : true;
};

watch(
  () => controller.value?.stick.left.button.pressed,
  (pressed) => {
    if (pressed) {
      shiftState.value = (shiftState.value + 1) % 3;
      if (shiftState.value === 2) {
        shiftSymbol.value = "⇪";
      } else {
        shiftSymbol.value = "⇧";
      }
    }
  }
);

/*
 * left stick logic
 */
const stickLeft = reactive<{ x: number; y: number }>({ x: 0, y: 0 });
const charGroup = ref(0);

const characterGroupPosition = (x: number, y: number) => {
  charGroup.value = useLeftStick(x, y);
};

watch(() => controller.value?.stick.left,
  (left) => {
    if(!(left?.horizontal === -1 || left?.horizontal === 1) && (stickLeft.x === left?.horizontal || stickLeft.y === left?.vertical)) return;


    stickLeft.x = left?.horizontal ? left?.horizontal : 0;
    stickLeft.y = left?.vertical ? left?.vertical : 0;
    characterGroupPosition(stickLeft.x, stickLeft.y);
  }
);

/*
 * right stick logic
 */
const stickRight = reactive<{ x: number; y: number }>({ x: 0, y: 0 });
const inputCharacter = ref(0);
const animateCharacterPosition = ref(0);
const activeCharGroup = ref(0);

const setInputCharacter = (x: number, y: number) => {
  if(activeCharGroup.value !== charGroup.value) {
    animateCharacterPosition.value = 0;
  }

  inputCharacter.value = useRightStick(x, y, charGroup.value);

  if(inputCharacter.value === 0 && animateCharacterPosition.value !== 0) {
    setTimeout(() => {
      if(inputCharacter.value === 0 && animateCharacterPosition.value !== 0){
        animateCharacterPosition.value = 0;
      } else {
        animateCharacterPosition.value = inputCharacter.value;
      }
    }, 100);
  } else {
    activeCharGroup.value = charGroup.value;
    animateCharacterPosition.value = inputCharacter.value;
  } 

};

watch(() => controller.value?.stick.right,
  (right) => {
    if(stickRight.x === right?.horizontal || stickRight.y === right?.vertical) return;

    stickRight.x = right?.horizontal ? right?.horizontal : 0;
    stickRight.y = right?.vertical ? right?.vertical : 0;
    setInputCharacter(stickRight.x, stickRight.y);
  }
);

const emits = defineEmits(["inputCharacter"]);

watch(inputCharacter, (position) => {
  if (position === undefined || position === 0 || position > 4) return;

  let characters = charGroups.value[charGroup.value].characters[position - 1];
  let character = characters.character;

  if (shiftState.value === 1) {
    character = characters.shiftedCharacter;
    setTimeout(() => {
      shiftState.value = 0;
    }, 150);

  } else if (shiftState.value === 2) {
    character = characters.shiftedCharacter;
  }

  emits("inputCharacter", character);
});

/**
 * space
 */
const animateSpace = ref(false);

watch(
  () => controller.value?.triggers.right.pressed,
  (pressed) => {
    if (pressed) {
      emits("inputCharacter", " ");
      animateSpace.value = true;
    } else {
      animateSpace.value = false;
    }
  }
);

/*
 * toggle layout (left trigger)
 */
const layoutSymbol = useCharacterDataLayout();
const animateLayout = ref(false);

const updateCharacterData = () => {
  charGroups.value = useCharacterData(
    getShiftState(),
    layoutState.value
  ).characterGroups;
  update.value++;
};

watch(
  () => controller.value?.triggers.left.pressed,
  (pressed) => {
    if (pressed) {
      layoutState.value = (layoutState.value + 1) % 3;
      shiftState.value = 0;
      updateCharacterData();
      animateLayout.value = true;
    } else {
      animateLayout.value = false;
    }
  }
);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/characterGroups.scss";

.animatePress {
  @apply bg-base border-base shadow-lg;

  & > * {
    filter: invert(100%);
  }
}

.info {
  @apply min-w-[330px] sm:min-w-[560px] md:min-w-[740px] flex flex-row sm:px-8 justify-between -z-10 self-center;

  &-top {
    @apply -mb-16;
  }

  &-bottom {
    @apply -mt-14 md:-mt-20;

    &-mid {
      @apply flex flex-row justify-center -mt-4 md:-mt-6 gap-10 sm:gap-16 md:gap-24 text-xl;
    }
  }

  &-wrapper {
    @apply flex flex-col w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 border-2 border-background text-xl rounded-full p-1 justify-evenly items-center shadow-md text-center;

    & .info-text {
      @apply text-base sm:text-xl md:text-3xl;
    }

    & svg {
      @apply fill-icon;
    }

    &-selected {
      @apply bg-base border-base text-secondary shadow-lg;
      & svg {
        @apply invert;
      }
      & .info-text-shift {
        @apply text-secondary;
      }
    }
  }

  &-text {
    @apply text-xl md:text-3xl;

    &-mid {
      @apply text-xs sm:text-base md:text-xl break-all;
    }
  }
  &-icon {
    @apply h-4 w-4 md:h-7 md:w-7;
  }
}
</style>

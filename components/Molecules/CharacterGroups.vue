<template>
  <div class="charactergroups-circle">
    <div
      v-for="group in characterGroups"
      :key="group.key"
      class="charactergroup transition-all duration-100 ease-in-out"
      :class="Number(group.key) === charGroup ? 'bg-slate-500 text-white' : ''"
    >
      <CharacterGroup :group="group" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import CharacterGroup from "@/components/Molecules/CharacterGroup.vue";
const props = defineProps<{ gamepad: Gamepad }>();

const { characterGroups } = useCharacterData();

const leftStick = reactive({ x: 0, y: 0 }); // Variable you want to watch
const charGroup = ref(0);

// Composable function to be executed whenever charGroup changes
const characterGroupPosition = () => {
  charGroup.value = useLeftStick(leftStick.x, leftStick.y);
};

watch(
  () => props.gamepad.axes,
  (leftAxes) => {
    leftStick.x = leftAxes[0];
    leftStick.y = leftAxes[1];
  }
);

watch(leftStick, characterGroupPosition); // Watch myVariable and execute myComposable when it changes
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
  border-width: 1px;

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

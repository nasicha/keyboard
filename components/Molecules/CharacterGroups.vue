<template>
  <div
    v-for="group in characterGroups"
    :key="group.key"
    class="rounded-xl border p-2"
    :class="Number(group.key) === charGroup ? 'bg-slate-500 text-white' : ''"
  >
    <CharacterGroup :group="group" />
  </div>
</template>

<script lang="ts" setup>
import CharacterGroup from "@/components/Molecules/CharacterGroup.vue";
const props = defineProps<{ gamepad: Gamepad }>();

const { characterGroups } = useCharacterData();

const leftStick = reactive({ x: 0, y: 0 }); // Variable you want to watch
const charGroup = ref(0);

// Composable function to be executed whenever myVariable changes
const characterGroupPosition = () => {
  // Your logic here
  charGroup.value = useLeftStick(leftStick.x, leftStick.y);
};

watch(
  () => props.gamepad.axes,
  (leftAxes) => {
    // Update myVariable when gamepad.axes changes

    leftStick.x = leftAxes[0]; // Use the desired index to get the value you need
    leftStick.y = leftAxes[1];
  }
);

watch(leftStick, characterGroupPosition); // Watch myVariable and execute myComposable when it changes
</script>
```

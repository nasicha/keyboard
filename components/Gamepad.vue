<script setup lang="ts">
import { computed } from "vue-demi";
import Item from "./Item.vue";
import Controller from "./Controller.vue";
const props = defineProps<{ gamepad: Gamepad }>();
const supportsVibration = computed(
  () => props.gamepad.hapticActuators.length > 0
);
const vibrate = () => {
  if (supportsVibration.value) {
    const actuator: any = props.gamepad.hapticActuators[0];
    actuator.playEffect("dual-rumble", {
      startDelay: 0,
      duration: 1000,
      weakMagnitude: 1,
      strongMagnitude: 1,
    });
  }
};
</script>

<template>
  <div
    bg="dark:dark-500 light-100"
    shadow="~ md"
    border="rounded"
    max-w="screen-lg"
    mx="auto"
    overflow="hidden"
    grid="~"
    class="md:shadow max-w-screen-lg border-r mx-auto overflow-hidden grid-cols-[2fr,1fr]"
  >
    <div class="p-4">
      <div class="text-xl font-medium">
        {{ gamepad.id }}
      </div>

      <div class="flex flex-row flex-wrap gap-x-4 mt-4">
        <Item label="Index">
          {{ gamepad.index }}
        </Item>
        <Item label="Connected">
          {{ gamepad.connected }}
        </Item>
        <Item label="Mapping">
          {{ gamepad.mapping || "N/A" }}
        </Item>
        <Item label="Timestamp">
          {{ gamepad.timestamp.toFixed(0) }}
        </Item>
      </div>

      <div class="font-medium mt-4">Buttons</div>
      <div class="flex flex-row flex-wrap gap-4 py-2">
        <Item
          v-for="(button, index) in gamepad.buttons"
          :key="index"
          class="px-2 py-1 border rounded"
          :label="`B${index}`"
        >
          {{ button.value.toFixed(2) }}
        </Item>
      </div>

      <div class="font-medium mt-4">Axes</div>
      <div class="flex flex-row flex-wrap gap-4 py-2">
        <Item
          v-for="(axis, index) in gamepad.axes"
          :key="index"
          class="px-2 py-1 border rounded"
          :label="`Axis ${index}`"
        >
          {{ axis.toFixed(2) }}
        </Item>
      </div>

      <button :disabled="!supportsVibration" @click="vibrate">Vibrate</button>
    </div>
    <div
      class="flex flex-row shrink-none itmes-center content-center p-8"
      bg="dark:dark-900 light-400"
    >
      <template v-if="gamepad.mapping === 'standard'">
        <Controller
          :gamepad="gamepad"
          class="text-dark-100 opacity-70 dark:text-light-900 dark:opacity-70"
        />
      </template>
      <template v-else>
        <span class="font-medium dark:text-light-900 dark:opacity-70">
          Unknown Controller Type
        </span>
      </template>
    </div>
  </div>
</template>

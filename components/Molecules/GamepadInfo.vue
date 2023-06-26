<template>
  <div
    class="max-w-screen-lg mx-auto overflow-hidden grid-cols-[2fr,1fr]"
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
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue-demi";
import Item from "@/components/Atoms/Item.vue";

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
```
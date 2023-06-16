<template>
  <div>
    <div
      v-if="!isSupported"
      flex="~ row"
      place="items-center content-center"
      items="center"
      space="x-4"
    >
      <i i-carbon-error text="5xl" opacity="50" />
      <div flex="~ col">
        <span text="2xl">Gamepad is not supported on this device.</span>
        <span opacity="70"
          >It seems your device does not support the Gamepad API. Check
          <a href="https://caniuse.com/gamepad">here</a> for a list supported
          devices.</span
        >
      </div>
    </div>
    <div
      v-else-if="gamepads.length === 0"
      class="flex flex-row items-center content-center space-x-4"
    >
      <span class="text-5xl opacity-50">🎮</span>
      <div class="flex flex-col">
        <span class="text-2xl">No Gamepad Detected</span>
        <span class="opacity-80"
          >Ensure your gamepad is connected and press a button to wake it
          up.</span
        >
      </div>
    </div>
    <div v-else class="space-y-4">
      <Gamepad
        v-for="gamepad in gamepads"
        :key="gamepad.id"
        :gamepad="gamepad"
        :show-gamepad="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGamepad } from "@vueuse/core";
import Gamepad from "@/components/Organisms/Gamepad.vue";
const { isSupported, gamepads } = useGamepad();
</script>

<template>
  <div class="mt-8">
    <div
      v-if="!isSupported"
      class="flex flex-row items-center content-center px-4"
    >
      <span class="text-5xl opacity-50">🚫</span>
      <div class="flex flex-col px-4">
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
      class="w-full flex flex-row items-center"
    >
      <span class="text-5xl opacity-50">🚫</span>
      <div class="flex flex-col">
        <span class="text-2xl">No Gamepad Detected</span>
        <span class="opacity-80"
          >Ensure your gamepad is connected and press a button to wake it
          up.</span
        >
      </div>
    </div>
    <div v-else>
      <Keyboard
        v-for="gamepad in gamepads"
        :key="gamepad.id"
        :gamepad="gamepad"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGamepad } from "@vueuse/core";
import Keyboard from "~/components/Organisms/Keyboard.vue";
const { isSupported, gamepads } = useGamepad();
</script>

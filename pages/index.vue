<template>
  <div :class="{ [`border border-base rounded-md p-8`]: !isSupported || gamepads.length === 0}">
    <div v-if="!isSupported">
      <Alert notSupportedAlert />
    </div>
    <div v-else-if="gamepads.length === 0">
      <Alert />
    </div>
    <div v-else>
      <KeyboardSandbox
        v-for="gamepad in gamepads"
        :key="gamepad.id"
        :gamepad="gamepad"
      />
    </div>
    <Infotable v-if="!isSupported || gamepads.length === 0"/>
  </div>
</template>

<script setup lang="ts">
import { useGamepad } from "@vueuse/core";
import KeyboardSandbox from "~/components/Organisms/KeyboardSandbox.vue";
import Infotable from "~/components/Molecules/Infotable.vue";
import Alert from "~/components/Molecules/Alert.vue";
const { isSupported, gamepads } = useGamepad();
</script>

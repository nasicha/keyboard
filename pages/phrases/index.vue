<template>
  <div :class="{ [`border border-base rounded-md p-8`]: !isSupported || gamepads.length === 0}">
    <div v-if="!isSupported">
      <Alert :notSupportedAlert="true" />
    </div>
    <div v-else-if="gamepads.length === 0">
      <Alert :notSupportedAlert="false" />
    </div>
    <div v-else>
      <KeyboardWithPhrases
        v-for="gamepad in gamepads"
        :key="gamepad.id"
        :gamepad="gamepad"
        :phrases="phrases"
      />
    </div>
    <Infotable v-if="!isSupported || gamepads.length === 0" phrasePage />
  </div>
</template>

<script setup lang="ts">
import { useGamepad } from "@vueuse/core";
import KeyboardWithPhrases from "~/components/Organisms/KeyboardWithPhrases.vue";
import Infotable from "~/components/Molecules/Infotable.vue";
import Alert from "~/components/Molecules/Alert.vue";
const { isSupported, gamepads } = useGamepad();

const phrases = ref<string[]>([]);

phrases.value = usePhrases();

</script>

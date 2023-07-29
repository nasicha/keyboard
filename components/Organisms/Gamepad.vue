<template>
  <div class="max-w-screen-lg mx-auto overflow-hidden grid-cols-[2fr,1fr]">
    <GamepadInfo :gamepad="gamepad" />

    <div
      v-if="showGamepad"
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

<script setup lang="ts">
import GamepadInfo from "@/components/Molecules/GamepadInfo.vue";
import Controller from "@/components/Atoms/Controller.vue";

defineProps<{ gamepad: Gamepad; showGamepad?: Boolean }>();

</script>

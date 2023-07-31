<template>
  <div 
    class="alert-wrapper">
    <client-only>
      <span class="text-5xl opacity-50">{{ alertEmoji }}</span>
      <div class="flex flex-col px-4">
        <span class="text-2xl">{{ alertInfo }}</span>
        <span class="opacity-80" v-html="alertText"
          ></span>
      </div>
      <template #fallback>
        <div class="h-14 alert-wrapper">
          <div class="min-w-md w-14 h-14 bg-background-light rounded-md animate-pulse duration-75"></div>
          <div class="flex flex-col px-4 py-1 w-full max-w-lg h-full">
            <div class="h-6 w-1/2 bg-background-light rounded-md animate-pulse duration-75 mb-2"></div>
            <div class="h-4 w-full bg-background-light rounded-md animate-pulse duration-75"></div>
          </div>
        </div>
      </template>
    </client-only>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{ notSupportedAlert: boolean }>();

const alertEmoji = ref("");
const alertInfo = ref("");
const alertText = ref("");
alertEmoji.value = props.notSupportedAlert ? "🚫" : "🎮";
alertInfo.value = props.notSupportedAlert ? "Gamepad is not supported on this device." : "No Gamepad Detected";
alertText.value = props.notSupportedAlert ? "It seems your device does not support the Gamepad API. Check <a href='https://caniuse.com/gamepad'>here</a> for a list supported devices." : "Ensure your gamepad is connected and press a button to wake it up.";

</script>
<style lang="scss" scoped>
@import "@/assets/scss/alerts.scss";
</style>
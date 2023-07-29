<template>
  <div 
    class="alert-wrapper">
    <span class="text-5xl opacity-50">{{ alertEmoji }}</span>
    <div class="flex flex-col px-4">
      <span class="text-2xl">{{ alertInfo }}</span>
      <span class="opacity-80" v-html="alertText"
        ></span>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{ notSupportedAlert: Boolean }>();

const alertEmoji = ref("");
const alertInfo = ref("");
const alertText = ref("");
alertEmoji.value = props.notSupportedAlert ? "🚫" : "🎮";
alertInfo.value = props.notSupportedAlert ? "Gamepad is not supported on this device." : "No Gamepad Detected";
alertText.value = props.notSupportedAlert ? "It seems your device does not support the Gamepad API. Check <a href='https://caniuse.com/gamepad'>here</a> for a list supported devices." : "Ensure your gamepad is connected and press a button to wake it up.";

</script>
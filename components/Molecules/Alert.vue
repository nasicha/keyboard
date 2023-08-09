<template>
  <div class="alert-wrapper">
    <ClientOnly>
      <StopSign v-if="notSupportedEmoji" />
      <NoController v-if="!notSupportedEmoji"/>
      <div class="flex flex-col px-4">
        <span class="text-2xl">{{ alertInfo }}</span>
        <span class="opacity-80" v-html="alertText"></span>
      </div>
    </ClientOnly>
    <div v-if="showSkeleton" class="h-14 alert-wrapper">
      <div class="min-w-md w-14 h-14 bg-background-light rounded-md animate-pulse duration-75"></div>
      <div class="flex flex-col px-4 py-1 w-full max-w-lg h-full">
        <div class="h-6 w-1/2 bg-background-light rounded-md animate-pulse duration-75 mb-2"></div>
        <div class="h-4 w-full bg-background-light rounded-md animate-pulse duration-75"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import StopSign from "@/assets/icons/stop-sign.svg?component";
import NoController from "@/assets/icons/no-controller.svg?component";
const props = defineProps<{ notSupportedAlert?: boolean }>();

const notSupportedEmoji = ref(false);
const alertInfo = ref("");
const alertText = ref("");
const showSkeleton = ref(true);

onMounted(() => {
  showSkeleton.value = false;
  notSupportedEmoji.value = props.notSupportedAlert;
  alertInfo.value = props.notSupportedAlert ? "Gamepad is not supported on this device." : "No Gamepad Detected";
  alertText.value = props.notSupportedAlert ? "It seems your device does not support the Gamepad API. Check <a href='https://caniuse.com/gamepad'>here</a> for a list supported devices." : "Ensure your gamepad is connected and press a button to wake it up.";
});
</script>
<style lang="scss" scoped>

.alert-wrapper {
  @apply w-full flex flex-row justify-center items-center gap-2 md:gap-6;

  & > svg {
    @apply w-14 h-14 min-w-[3rem];
  }
}
</style>
<template>
  <div class="flex items-center p-4 gap-4 border-b-2 last:border-b-0">
    <IconLS v-if="info.icon === 'ls'" class="w-8 h-8" />
    <IconRS v-if="info.icon === 'rs'" class="w-8 h-8" />
    <IconRT v-if="info.icon === 'rt'" class="w-8 h-8" />
    <IconLT v-if="info.icon === 'lt'" class="w-8 h-8" />
    <IconRB v-if="info.icon === 'rb'" class="w-8 h-8" />
    <IconLB v-if="info.icon === 'lb'" class="w-8 h-8" />
    <IconX v-if="info.icon === 'x'" class="w-8 h-8" />
    <IconClickL v-if="info.icon === 'clickl'" class="w-8 h-8" />
    <IconStart v-if="info.icon === 'start'" class="w-8 h-8 fill-none stroke-base stroke-[4]" />
    <IconDpadDown v-if="info.icon === 'dpad-down'" class="w-8 h-8" />
    <span >{{ info.text }}</span>
  </div>
</template>
<script setup lang="ts">
import { Info } from "@/types/info"
import IconLS from "@/assets/icons/xbox_stick_l.svg?component";
import IconRS from "@/assets/icons/xbox_stick_r.svg?component"
import IconRT from "@/assets/icons/xbox_trigger_rt.svg?component";
import IconRB from "@/assets/icons/xbox_bumper_rb.svg?component";
import IconLT from "@/assets/icons/xbox_trigger_lt.svg?component";
import IconLB from "@/assets/icons/xbox_bumper_lb.svg?component";
import IconClickL from "@/assets/icons/xbox_click_l.svg?component";
import IconX from "@/assets/icons/xbox_button_x.svg?component";
import IconStart from "@/assets/icons/xbox_button_start.svg?component";
import IconDpadDown from "@/assets/icons/xbox_dpad_down.svg?component";

defineProps<{
  info: Info
}>();

</script>
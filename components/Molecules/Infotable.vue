<template>
  <div class="mt-6">
    <h2 class="mb-2">Hana DS Controls</h2>
    <div class="border-y-2 px-4 mb-2">
      <InfotableRow v-for="info in infos" :info="info" class="odd:bg-background-lighter even:bg-background-light" />
    </div>
  </div>
  <Disclaimer />
</template>
<script setup lang="ts">
import { Info } from "@/types/info"
import InfotableRow from '@/components/Atoms/InfotableRow.vue';
import Disclaimer from '@/components/Atoms/Disclaimer.vue';

const props = defineProps<{
  phrasePage?: boolean
}>();

const infos = ref<Info[]>();
  infos.value = [
    {
        text: 'Select Charactergroup',
        icon: 'ls'
    },
    {
        text: 'Input Character',
        icon: 'rs'
    },

    {
        text: '1x Shift Character / 2x Caps Lock',
        icon: 'clickl'
    },
    {
      text: 'Backspace',
      icon: 'x'
    },
    {
      text: 'Space',
      icon: 'rt'
    },
    {
      text: 'Move Cursor left',
      icon: 'lb'
    },
    {
      text: 'Move Cursor right',
      icon: 'rb'
    },
    {
      text: 'Toggle layout (Characters -> Symbols -> Emoji)',
      icon: 'lt'
    },
    {
      text: 'Hide/Show Keyboard (testing purpose)',
      icon: 'dpad-down'
    },
  ];

  if(props.phrasePage) {
    infos.value.push(
      {
        text: 'Submit Phrase (page phrase only)',
        icon: 'start'
      }
    )
  }
</script>







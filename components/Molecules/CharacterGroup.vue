<template>
  <div class="font-medium text-xl mt-4">{{ props.group.key }}</div>
  <div class="flex flex-row flex-wrap gap-4 py-2">
    <div
      v-for="character in props.group.characters"
      :key="character.position"
      class="px-2 py-1 border rounded"
    >
      <span class="text-2xl">{{ character.character }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { characterGroup } from "@/types/characterGroup";

const props = defineProps<{ group: characterGroup }>();


</script>
```
<template>
  <span class="text-2xl">{{ character }}</span>
</template>

<script lang="ts" setup>
  const props = defineProps<{ character: string }>();

  const character = ref('');

  character.value = props.character === '\xa0' ? '␣' : props.character ;
</script>
```
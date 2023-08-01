<template>
  <textarea 
    v-model="input" 
    ref="inputField"
    class="w-full min-h-[4rem] p-2 border rounded-md border-base resize-none outline-none mb-4"  
  />


</template>

<script setup lang="ts">  

// input
const input = ref("");
const inputField = ref<HTMLTextAreaElement | null>(null);

onMounted(() => {
  inputField.value?.focus();
});



/*
* textarea
*/
function updateTextareaHeight() {
  if(inputField.value === null) return;

  inputField.value.style.height = '';
  inputField.value.style.height = `${inputField.value.scrollHeight + 3}px`;
}

watch(() => input.value, () => {
  updateTextareaHeight();
});

</script>

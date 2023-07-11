<template>
	<h1 class="pb-4">Groups</h1>
	<ul>
		<li
		v-for="charGroup in characterGroups"
		key="charGroup.key">
      <div v-if="charGroup.key === '0'" class="wrapper">
        <div
          v-for="char in charGroup.characters"
          key="char.position"
          :class="{
            'characterBg': true,
            [`characterBg-${char.position}`]: true,
            'characterBg-input': toggleDirection === char.position,
          }"
        ></div>
      </div>
		</li>
	</ul>
</template>

<script lang="ts" setup>
import { useCharacterData } from "@/composables/useData";
const { characterGroups } = useCharacterData();

const toggleDirection = ref(-1);

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp') {
    toggleDirection.value = 1;
  }
  if (event.key === 'ArrowRight') {
    toggleDirection.value = 2;
  }
  if (event.key === 'ArrowDown') {
    toggleDirection.value = 3;
  }
  if (event.key === 'ArrowLeft') {
    toggleDirection.value = 4;
  }
  setTimeout(() => {
    toggleDirection.value = -1;
  }, 200);
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

  

</script>

<style lang="scss">
.wrapper {
  @apply relative text-secondary grid grid-cols-2 rounded-full aspect-square max-w-xs rotate-45 shadow-xl;
}

.characterBg {
  @apply relative text-2xl bg-base border-secondary;

  &-1 {
    @apply rounded-tl-full border-b-4 border-r-4;

    
    &::before {
      transform: translate(50%, 50%) scale(0);
      border-top: 0.5em solid #000;
      border-left: 0.5em solid #000;
    }
  }
  &-2 {
    @apply rounded-tr-full border-b-4 border-l-4;

    &::before {
      transform: translate(-50%, 50%) scale(0);
      border-top: 0.5em solid #000;
      border-right: 0.5em solid #000;
    }
  }

  &-3 {
    @apply rounded-br-full border-t-4 border-l-4;

    &::before {
      transform: translate(-50%, -50%) scale(0);
      border-bottom: 0.5rem solid #000;
      border-right: 0.5rem solid #000;
    }
  }
  &-4 {
    @apply rounded-bl-full border-t-4 border-r-4;

    &::before {
      transform: translate(50%, -50%) scale(0);
      border-bottom: 0.5em solid #000;
      border-left: 0.5em solid #000;
    }
  }


  &:nth-child(4n + 4) {
    grid-row: 2;
  }

  &::before {
    border-radius: inherit;
    content: '';
    position: absolute;
    z-index: -1;

    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }

  &-input {
    @apply shadow-lg text-base ;
  // background: #fff;
    
    &::before {
        transform: translate(0, 0) scale(1);    
        background: white;
        transition: transform 150ms cubic-bezier(0,0.4,0.7,1.2);
        z-index: 10;
    }
  }
}

</style>

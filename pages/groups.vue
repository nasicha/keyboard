<template>
	<h1 class="pb-4">Groups</h1>
	<ul>
		<li
		v-for="charGroup in characterGroups"
		key="charGroup.key">
			<span>Group: {{ charGroup.key }}</span>
			<ul
				class="list-inside list-disc pl-4"
			>
				<li
          v-for="char in charGroup.characters"
          key="char.position"
        >{{ char.character }}</li>
			</ul>
		</li>
	</ul>
</template>

<script lang="ts" setup>
import { useCharacterData } from "@/composables/useData";
const { characterGroups } = useCharacterData();
</script>

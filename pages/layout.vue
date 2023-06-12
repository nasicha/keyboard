<template>
  <div class="p-16">
    <h1 class="text-8xl pb-12">Layout</h1>

    <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div class="inline-block min-w-full">
        <div class="overflow-hidden">
          <table class="min-w-full text-left text-sm font-light">
            <thead class="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col">Input Group</th>
                <th scope="col">Button</th>
              </tr>
            </thead>
            <tbody>
                <template v-for="groups in layout" >
                  <tr  class="border-b dark:border-neutral-500">
                    <td>{{ groups.name }}</td>
                <template v-for="input in groups.inputs" >
                    <tr>
                      <td><span   class="font-icon text-4xl">{{ input.value }}</span></td>
                      <td>{{ input.label }}</td>
                    </tr>
                    </template>
                  </tr>
                </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script lang="ts" setup>
const { layout } = useLayout();
</script>
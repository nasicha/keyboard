<template>
  <div class="p-16">
    <h1 class="text-8xl pb-12">Layout</h1>

    <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div class="inline-block min-w-full">
        <div class="overflow-hidden">
          <table class="min-w-full text-left text-sm font-light mx-auto">
            <thead class="border-b font-medium dark:border-neutral-500">
              <tr>
                <th/>
                <th scope="col">Button</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
                <template v-for="groups in layout" >
                    <template v-for="(input, key) in groups.inputs" >
                      <tr  :class="key+1 === groups.inputs.length ? 'border-b dark:border-neutral-500' : ''">
                        <th v-if="key === 0" :rowspan="groups.inputs.length"> {{ groups.name }}</th>
                
                        <td><span class="font-icon text-4xl" :title="input.label">{{ input.value }}</span></td>
                        <td>{{ input.action }}</td>
                    </tr>
                  </template>
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
<template>
  <div class="w-full flex justify-start">
    <template v-for="filter in filters">
      <FilterButton 
        :key="filter.key"
        :filter="filter" 
      >
        <template v-slot:menu="{ filterItem }">
          <v-radio-group
              v-model="selectedPrice"
              column
            >
              <v-radio
                v-for="priceOption in priceOptions"
                :key="priceOption.label"
                :label="priceOption.label"
                color="primary"
                :value="priceOption.value"
              ></v-radio>
          </v-radio-group>
          <div class="w-full mt-8 tw-pt-8">
            <v-range-slider
              track-color="black"
              :thumb-size="36"
              v-model="selectedPrice"
              :min="0"
              :max="500"
              @change="handleFilterChange();"
              thumb-label="always"
            >
              <template v-slot:thumb-label="{ value }">
                
                <span class="tw-font-bold">€{{ value }}</span>
              </template>
            </v-range-slider>
          </div>
        </template>
      </FilterButton>
    </template>

  </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';

    @Component<DynamicFilter>({
        components: {},
    })
    export default class DynamicFilter extends Vue {
        @Prop()
        protected filters!: FilterItem[];

        protected selectedPrice: number[] = [0, 500];

        protected priceOptions: { label: string, value: number[] }[] = [
          {
            label: 'tot €100',
            value: [0, 100],
          },
          {
            label: '€100 - €250',
            value: [100, 250],
          },
          {
            label: '€250 - €500',
            value: [250, 500],
          },
        ];

        protected async mounted(): Promise<void> {
        };

        protected handleFilterChange(): void {};
    }

    export type FilterItem = {
      label?: string,
      key?: string,
      type?: 'price' | 'date' | 'attendees',
    };
</script>

<style lang="scss">
   
</style>
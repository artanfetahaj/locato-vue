<template>
  <ul class="tw-list-none tw-p-16">
    <li class="tw-flex tw-w-full tw-py-4">
      <span class="tw-text-xl tw-w-2/3 tw-pr-8 tw-text-left">Huurkosten ({{ hours }} x €{{ price_per_hour  | currency  }})</span>
      <span class="tw-text-xl tw-w-1/3 tw-pl-8 tw-text-right tw-font-bold">€ {{ hourlyCosts  | currency }}</span>
    </li>
    <li class="tw-flex tw-w-full tw-py-4">
      <span class="tw-text-xl tw-w-2/3 tw-pr-8 tw-text-left">Servicekosten</span>
      <span class="tw-text-xl tw-w-1/3 tw-pl-8 tw-text-right tw-font-bold">€ {{ serviceFee | currency }}</span>
    </li>
    <li class="tw-flex tw-w-full tw-mt-16 tw-pt-16 tw-border-t-2 tw-border-gray-300">
      <span class="tw-text-xl tw-w-2/3 tw-pr-8 tw-text-left tw-font-extrabold">Totaal</span>
      <span class="tw-text-xl tw-w-1/3 tw-pl-8 tw-text-right tw-font-bold">€ {{ total | currency }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import _ from 'lodash';

    @Component<BookingCard>({
        components: {},
    })
    export default class BookingCard extends Vue {
        @Prop()
        protected price_per_hour!: number;

        @Prop()
        protected hours!: number;

        protected async mounted(): Promise<void> {}

        protected get hourlyCosts(): number {
          return Math.ceil(this.price_per_hour * this.hours);
        }

        protected get serviceFee(): number {
          return Math.ceil(this.hourlyCosts * 0.075);
        }

        protected get total(): number {
          return this.hourlyCosts + this.serviceFee;
        }
    }
</script>

<style lang="scss">
   
</style>
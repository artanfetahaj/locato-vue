<template>
  <v-card
    class="tw-w-full tw-border-gray-300 tw-p-8"
  >
    
    <v-card-title>
      <span class="tw-w-full tw-font-semibold tw-text-center"><span class="tw-font-bold">€{{ location.price_per_hour }}</span> / uur</span>
    </v-card-title>

    <v-card-subtitle class="tw-text-center">
      <span>Minimaal {{ location.min_rent_time_hours }} uur</span>
    </v-card-subtitle>

    <div class="tw-w-full tw-grid tw-grid-cols-2 tw-grid-rows-1 tw-gap-8 tw-px-8 tw-mb-16 tw-mt-8">
      <datetime
        v-model="startDate"
        input-id="startDate"
        :input-class="`
          tw-capitalize
          tw-text-base
          tw-z-10
          tw-w-full
          tw-max-w-full
          tw-border-solid
          tw-pt-32
          tw-p-8
          tw-border-primary-500
          tw-border-2
          tw-rounded-lg
          tw-cursor-pointer
          tw-transition
          tw-duration-300
          tw-ease-in-out
          hover:tw-border-primary-300
          ${startDate ? 'tw-border-gray-900' : 'tw-border-gray-300'}
        `"
        class="tw-cursor-pointer tw-col-span-1 tw-relative tw-text-lg"
        type="datetime"
        :phrases="{ok: 'Doorgaan', cancel: 'Annuleren'}"
        title="Begintijd"
      >
        <span slot="before" class="tw-absolute tw-top-8 tw-left-8 tw-w-full tw-text-base tw-font-bold tw-uppercase tw-z-0 tw-pointer-events-none tw-cursor-pointer">Begintijd</span>
        <span v-if="!startDate" slot="after" class="tw-absolute tw-bottom-8 tw-left-8 tw-text-base tw-z-0 tw-pointer-events-none tw-cursor-pointer">Kies datum en tijd</span>
      </datetime>
      <datetime
        v-model="endDate"
        input-id="endDate"
        :input-class="`
          tw-capitalize
          tw-text-base
          tw-z-10
          tw-w-full
          tw-max-w-full
          tw-border-solid
          tw-pt-32
          tw-p-8
          tw-border-primary-500
          tw-border-2
          tw-rounded-lg
          tw-cursor-pointer
          tw-transition
          tw-duration-300
          tw-ease-in-out
          hover:tw-border-primary-300
          ${endDate ? 'tw-border-gray-900' : 'tw-border-gray-300'}
        `"
        class="tw-cursor-pointer tw-col-span-1 tw-relative tw-text-lg"
        type="datetime"
        :phrases="{ok: 'Doorgaan', cancel: 'Annuleren'}"
        title="Eindtijd"
        @input="handleDateChanged($event)"
        format="cccc d LLLL T"
      >
        <span slot="before" class="tw-absolute tw-top-8 tw-left-8 tw-w-full tw-text-base tw-font-bold tw-uppercase tw-z-0 tw-pointer-events-none tw-cursor-pointer">Eindtijd</span>
        <span v-if="!endDate" slot="after" class="tw-absolute tw-bottom-8 tw-left-8 tw-text-base tw-z-0 tw-pointer-events-none tw-cursor-pointer">Kies datum en tijd</span>
      </datetime>
    </div>

    <v-card-actions class="tw-flex tw-justify-center">
      <v-btn
        :disabled="!startDate || !endDate"
        class="tw-w-full tw-font-bold "
        color="primary"
        tile
        fab
      >
        <span class="tw-px-8">Reserveren</span>
      </v-btn>
    </v-card-actions>
    <div v-if="startDate && endDate" class="tw-text-center tw-w-full tw-p-8 tw-mt-8 tw-text-black-400"><span>Er wordt nog niets in rekening gebracht.</span></div>

    <PriceBreakdown v-if="startDate && endDate" :price_per_hour="location.price_per_hour" :hours="selectedHours" />
  </v-card>
  
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { Location } from '@/models/Location';
    import { User } from '@/models/User';
    import _ from 'lodash';
    import { DateTime, Duration } from 'luxon';

    @Component<BookingCard>({
        components: {},
    })
    export default class BookingCard extends Vue {
        @Prop()
        protected location!: Location;

        protected async mounted(): Promise<void> {}

        protected startDate = '';

        protected endDate = '';

        protected showAuthModal(): void {
          this.$store.commit('Auth/showAuthModal', true);
        }
        

        protected handleDateChanged(event: any): void {
          console.log('handleDateChanged', event);
        }
        
        protected get user(): User {
          return this.$store.getters['Auth/loggedInUser'];
        }
        
        protected get selectedHours(): number {  
          const start = DateTime.fromISO(this.startDate);;
          const end = DateTime.fromISO(this.endDate);

          const duration: Duration = end.diff(start, 'hours');

          return duration.hours;
        }
    }
</script>

<style lang="scss">
  //  #startTime {
  //    padding: 16px!important;
  //  }
</style>
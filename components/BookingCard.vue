<template>
  <v-card
    class="tw-w-full tw-border-gray-300 tw-p-8"
  >
    
    <v-card-title>
      <h3 class="tw-w-full tw-font-semibold tw-text-center">Beschikbaarheid opvragen</h3>
    </v-card-title>

    <v-card-subtitle class="tw-text-center">
      <span>Ontvang binnen 2 werkdagen een bevestiging</span>
    </v-card-subtitle>

    <div class="v-text-field v-input"> 
      <datetime
        v-model="date"
        input-class="tw-border-primary-500 tw-border-4 tw-border"
        type="datetime"
        :phrases="{ok: 'Doorgaan', cancel: 'Annuleren'}"
        :use12-hour="true"
        title="Startdatum"
      ></datetime>
    </div>

    <v-card-actions class="tw-flex tw-justify-center">
      <v-btn
        class="tw-w-full"
        color="primary"
        tile
        large
      >
        <span class="tw-normal-case tw-px-8">Beschikbaarheid opvragen</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { Location } from '@/models/Location';
    import { User } from '@/models/User';
    import _ from 'lodash';

    @Component<BookingCard>({
        components: {},
    })
    export default class BookingCard extends Vue {
        @Prop()
        protected location!: Location;

        protected date = '';

        protected async mounted(): Promise<void> {}

        protected showAuthModal(): void {
          this.$store.commit('Auth/showAuthModal', true);
        }
        
        protected get user(): User {
            return this.$store.getters['Auth/loggedInUser'];
        }
    }
</script>

<style lang="scss">
   
</style>
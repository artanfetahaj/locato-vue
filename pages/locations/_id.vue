<template>
  <div class="tw-w-full tw-max-w-page tw-mx-auto tw-flex-wrap tw-px-32">
    <template v-if="isLoading">
      <div class="tw-w-full tw-flex tw-justify-center tw-mt-128">
        <v-progress-circular
          indeterminate
          color="primary"
          class="tw-self-center"
        ></v-progress-circular>
      </div>
    </template>
    <template v-if="!isLoading">
      <div class="tw-relative">
        <!-- <v-img
          :src="location.media[0].url"
          max-height="400"
          class="tw-cursor-pointer"
          @click="showImageSlider = true;"
        >
        </v-img> -->
        <div class="tw-absolute tw-top-16 tw-right-16">
          <v-btn
            class="tw-capitalize tw-mr-8"
            color="white"
          >
            <v-icon class="tw-text-lg tw-mr-4 tw-text-gray-800">mdi-share</v-icon>
            <span class="tw-text-gray-800">Delen</span>
          </v-btn>
          <v-btn
            class="tw-capitalize"
            :color="locationIsFavorited(location.id) ? 'red lighten-2' : 'white'"
            @click="toggleFavorite(location.id);"
          >
            <v-icon
              class="tw-text-lg tw-mr-4"
              :class="locationIsFavorited(location.id) ? 'tw-text-white' : 'tw-text-gray-800'"
            >
              {{  locationIsFavorited(location.id) ? 'mdi-heart' : 'mdi-heart-outline'}}
            </v-icon>
            <span
              :class="locationIsFavorited(location.id) ? 'tw-text-white' : 'tw-text-gray-800'"
            >
              {{  locationIsFavorited(location.id) ? 'Opgeslagen' : 'Opslaan'}}
            </span>
          </v-btn>
        </div>
      </div>
      <v-layout wrap align-center class="tw--m-8 tw-pt-32">
        <v-flex
          class="tw-p-8"
          sm12
          md8
        >
          <div class="tw-w-full">
            <h1 class="tw-w-full tw-text-4xl tw-font-bold">{{ location.title }}</h1>
            <AttendeesLabel v-if="location.attendees > 0" :attendees="location.attendees" />
          </div>
        </v-flex>
        <v-flex
          class="tw-p-8"
          sm12
          md4
        >
          <BookingCard :location="location" />
        </v-flex>
      </v-layout>
      
    </template>
    <v-dialog
        v-if="!isLoading && location.media"
        v-model="showImageSlider"
        max-width="1200"
    >
        <v-carousel height="450" >
            <v-carousel-item
                transition="v-fade-transition"
                v-for="(media,i) in location.media"
                :key="i"
                :src="media.url"
                nuxt
            ></v-carousel-item>
        </v-carousel>
    </v-dialog>
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { Location } from '@/models/Location.ts';
  import _ from 'lodash';
  import { User } from '@/models/User';

  @Component<LocationDetail>({
    // async asyncData({ $axios }) {
    //   const ip = await $axios.$get('http://icanhazip.com')
    //   return { ip }
    // }
    // head(this: provinceLocations): object {
    //   return {
    //       province: '',
    //       title: this.pageTitle,
    //       meta: [
    //           // hid is used as unique identifier. Do not use `vmid` for it as it will not work
    //           { hid: 'description', name: 'description', content: 'My custom description' }
    //       ]
    //   };
    // }
  })
  export default class LocationDetail extends Vue {
    protected location: Location | null = null;

    protected isLoading = true;

    protected showImageSlider = false;

    protected async mounted(): Promise<void> {
      await this.getLocation();
    }

    protected async getLocation(): Promise<void> {
      await new Location().find(this.$route.params.id)
            .then((location: Location) => {
              this.location = location;
              this.isLoading = false;
            })
            .catch((error: any) => console.log(error));
    }

    protected showAuthModal(): void {
      this.$store.commit('SHOW_AUTH_MODAL', true);
    }

    protected toggleFavorite(id: string): void {
      let favorites = [];

      if (this.locationIsFavorited(id)) {
        favorites = this.savedLocationsIds.filter((indexedLocation) => indexedLocation !== `${id}`)
      } else {
        const savedlocations = _.clone(this.savedLocationsIds);
        savedlocations.push(`${id}`);

        favorites = savedlocations;
      }

      this.updateFavorites(favorites);
    }

    protected async updateFavorites(favorites: string[]): Promise<void> {
      const payload = {
        saved_locations: favorites,
      };
      
      // await this.$axios.put("http://localhost:1337/users/me", payload).then(res => console.log(res))
      // .then(() => {
      //   // this.$auth.fetchUser();
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
    }

    protected locationIsFavorited(id: string): boolean {
      return this.savedLocationsIds.some((indexedId) => indexedId === `${id}` );
    }

    protected get user(): User {
        return this.$store.getters.loggedInUser;
    }

    protected get savedLocationsIds(): string[] {
      if (!this.user?.saved_locations) {
        return [];
      }

      return this.user.saved_locations.map((location: Location) => `${location.id}`);
    }
}
</script>

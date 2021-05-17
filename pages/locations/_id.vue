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
        <v-img
          :src="location.images[0].file_url"
          max-height="400"
          class="tw-cursor-pointer"
          @click="showImageSlider = true;"
        >
        </v-img>
        <div class="tw-absolute tw-top-16 tw-right-16">
          <v-btn
            v-if="isOwner"
            class="tw-capitalize tw-mr-8"
            color="white"
          >
            <v-icon class="tw-text-lg tw-mr-4 tw-text-black-800">mdi-pencil</v-icon>
            <span class="tw-text-black-800">Bewerken</span>
          </v-btn>
          <v-btn
            v-if="!isOwner"
            class="tw-capitalize tw-mr-8"
            color="white"
          >
            <v-icon class="tw-text-lg tw-mr-4 tw-text-black-800">mdi-share</v-icon>
            <span class="tw-text-black-800">Delen</span>
          </v-btn>
          <v-btn
            v-if="!isOwner"
            class="tw-capitalize"
            :color="locationIsFavorited(location.id) ? 'red lighten-2' : 'white'"
            @click="toggleFavorite(location.id);"
          >
            <v-icon
              class="tw-text-lg tw-mr-4"
              :class="locationIsFavorited(location.id) ? 'tw-text-white' : 'tw-text-black-800'"
            >
              {{  locationIsFavorited(location.id) ? 'mdi-heart' : 'mdi-heart-outline'}}
            </v-icon>
            <span
              :class="locationIsFavorited(location.id) ? 'tw-text-white' : 'tw-text-black-800'"
            >
              {{  locationIsFavorited(location.id) ? 'Opgeslagen' : 'Opslaan'}}
            </span>
          </v-btn>
        </div>
      </div>
      <v-layout wrap align-center class="tw--m-24 tw-pt-32">
        <v-flex
          class="tw-p-32 tw-self-start"
          sm12
          md8
        >
          <v-layout row wrap>
            <div class="tw-w-full tw-mt-24 tw-relative">
              <h1 class="tw-w-full tw-text-4xl tw-font-bold">{{ location.title }}</h1>
              <AttendeesLabel :attendees="50" />
              <v-avatar
                class="tw-absolute tw-right-0 tw-top-0 tw-cursor-pointer"
                :width="64"
                :height="64"
                :min-width="64"
                :min-height="64"
              >
                <NuxtLink to="#host">
                  <img
                    v-if="location.user.avatar"
                    class="tw-object-cover"
                    :src="location.user.avatar"
                    alt="John"
                  >
                  <div class="tw-bg-gray-100 tw-w-full tw-h-full">
                    <v-icon v-if="!location.user.avatar" class="tw-text-2xl tw-mb-4 tw-pb-2 tw-text-gray-500">mdi-account</v-icon>
                  </div>
                </NuxtLink>
              </v-avatar>
            </div>
            <div class="tw-w-full tw-border-t-2 tw-border-black-200 tw-py-32 tw-my-32">
              <read-more more-str="lees meer" :text="msg" link="#" less-str="lees minder" :max-chars="400"></read-more>
            </div>
            <div id="#host" class="tw-w-full tw-border-t-2 tw-border-black-200 tw-py-32">
              <div class="tw-flex tw-w-full">
                <v-avatar
                  class="tw-shrink tw-cursor-pointer"
                  :width="64"
                  :height="64"
                  :min-width="64"
                  :min-height="64"
                >
                  <NuxtLink to="#host">
                    <img
                      v-if="location.user.avatar"
                      class="tw-object-cover"
                      :src="location.user.avatar"
                      alt="John"
                    >
                    <div class="tw-bg-gray-100 tw-w-full tw-h-full">
                      <v-icon v-if="!location.user.avatar" class="tw-text-2xl tw-mb-4 tw-pb-2 tw-text-gray-500">mdi-account</v-icon>
                    </div>
                  </NuxtLink>
                </v-avatar>
                <div class="tw-pl-32 tw-self-center tw-w-full">
                  <h2 class="tw-text-3xl tw-font-bold">Aangeboden door {{ location.user.first_name }}</h2>
                  <p class="tw-text-gray-800 tw-text-lg">Lid sinds november 2016</p>
                </div>
                
                
              </div>
            </div>
          </v-layout>
        </v-flex>
        <v-flex
          class="tw-p-24"
          sm12
          md4
        >
          <BookingCard :location="location" />
        </v-flex>
      </v-layout>
      
    </template>
    <v-dialog
        v-if="!isLoading && location.images"
        v-model="showImageSlider"
        max-width="1350"
        overlay-opacity="0.8"
        eager
    >
        <v-carousel hide-delimiter-background height="auto" >
            <v-carousel-item
                v-for="(image,i) in location.images"
                :key="i"
                :src="image.file_url"
                nuxt
            ></v-carousel-item>
            <template v-slot:prev="{ on, attrs }">
              <v-btn
                color="white"
                light
                v-bind="attrs"
                v-on="on"
                fab
                small
              ><v-icon>mdi-chevron-left</v-icon></v-btn>
            </template>
            <template v-slot:next="{ on, attrs }">
              <v-btn
                color="white"
                light
                v-bind="attrs"
                v-on="on"
                fab
                small
              ><v-icon>mdi-chevron-right</v-icon></v-btn>
            </template>
        </v-carousel>
    </v-dialog>
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { Location } from '@/models/Location';
  import _ from 'lodash';
  import { User } from '@/models/User';

  @Component<LocationDetail>({
    async fetch() {
      await this.getLocation();
      this.pageTitle = this.location?.title || '';
    },
    head(this: LocationDetail): object {
      return {
          title: this.pageTitle,
          meta: [
              // hid is used as unique identifier. Do not use `vmid` for it as it will not work
              { hid: 'description', name: 'description', content: 'My custom description' }
          ]
      };
    }
  })
  export default class LocationDetail extends Vue {
    protected pageTitle = '';

    protected location: Location | null = null;

    protected isLoading = true;

    protected showImageSlider = false;

    protected msg = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non ligula ipsum. Suspendisse eget commodo ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In tempus nisi a justo interdum, eu tristique lacus tincidunt. Vivamus quis massa imperdiet, pellentesque massa mollis, bibendum tellus. Duis hendrerit erat id erat finibus ornare. Aliquam tincidunt iaculis dolor non hendrerit. Mauris facilisis fermentum mauris ac pellentesque. Vivamus gravida orci pellentesque purus finibus mollis vel consequat erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque tincidunt libero nec lorem porta luctus. Duis sit amet massa urna. Donec pulvinar, leo et eleifend congue, risus dolor sodales dui, vel vestibulum lorem odio in turpis. Aenean rhoncus nunc mauris, quis rhoncus augue volutpat a.<br><br>Praesent consectetur aliquam elementum. Suspendisse euismod molestie faucibus. Cras non est in lectus sollicitudin congue vel pulvinar risus. Pellentesque quis pulvinar ex. Donec vulputate dignissim ligula in vestibulum. Fusce nunc odio, rhoncus vitae mattis in, tempus vel ligula. Pellentesque non neque ac risus molestie ultrices. Pellentesque laoreet lectus sed libero sodales, ornare eleifend elit finibus.';

    protected async getLocation(): Promise<void> {
      await new Location().include('user').find(this.$route.params.id)
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
      return this.$store.getters['Auth/loggedInUser'];
    }

    protected get isOwner(): boolean {
      return this.location?.user?.id === this.user?.id;
    }

    protected get savedLocationsIds(): string[] {
      if (!this.user?.saved_locations) {
        return [];
      }

      return this.user.saved_locations.map((location: Location) => `${location.id}`);
    }
}
</script>

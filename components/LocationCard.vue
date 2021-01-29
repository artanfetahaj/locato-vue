<template>
  <v-card
    class="tw-w-full"
  >
    <v-carousel height="200" hide-delimiters show-arrows-on-hover>
        <v-carousel-item
            v-for="(media,i) in location.media"
            :key="i"
            :src="media.formats.small.url"
            :to="`/locations/${location.id}`"
            nuxt
        ></v-carousel-item>
    </v-carousel>

    <v-card-title>
      <h3 class="tw-font-semibold">{{location.title}}</h3>
    </v-card-title>

    <v-card-subtitle>
      1,000 miles of wonder
    </v-card-subtitle>

    <v-card-actions>
        <div class="tw-w-full tw-flex tw-justify-end">
            <v-btn
                text
                icon
                color="red lighten-2"
                @click="$store.getters.isAuthenticated ? toggleFavorite(location.id) : showAuthModal();"
            >
                <v-icon>{{  this.locationIsFavorited(location.id) ? 'mdi-heart' : 'mdi-heart-outline'}}</v-icon>
            </v-btn>
        </div>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { Location } from '@/models/Location';
    import { User } from '@/models/User';
    import _ from 'lodash';
import { comment } from 'postcss';

    @Component<LocationOverview>({
        components: {},
    })
    export default class LocationOverview extends Vue {
        @Prop()
        protected location!: Location;

        protected async mounted(): Promise<void> {}

        protected showAuthModal(): void {
          this.$store.commit('SHOW_AUTH_MODAL', true);
        }

        protected isLocationInFavorites(id: string) {
            
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
         
          console.log(payload);
            await this.$axios.put("http://localhost:1337/users/me", payload).then(res => console.log(res))
            .then(() => {
              this.$auth.fetchUser();
            })
            .catch((error) => {
              console.log(error);
            });

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

<style lang="scss">
   
</style>
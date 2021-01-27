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
                color="primary"
                @click="$store.getters.isAuthenticated ? '' : showAuthModal();"
            >
                <v-icon>mdi-heart-outline</v-icon>
            </v-btn>
        </div>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';

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
    }
</script>

<style lang="scss">
   
</style>
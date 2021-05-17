<template>
  <div
    class="
      tw-w-full
      tw-min-h-screen
      tw-bg-gradient-to-t
      tw-to-white
      tw-from-gray-100
    "
  >
    <div class="tw-w-full tw-mt-32 tw-max-w-page tw-mx-auto tw-px-32 tw-pt-56 tw-relative">
      <v-btn
        v-if="showFields"
        @click.native="showFields = false;"
        class="tw-absolute tw-left-0 tw-top-0 tw-capitalize tw-transparent"
        color="primary"
        rounded
        text
      >
        <v-icon class="tw-text-lg tw-mr-8">mdi-arrow-left</v-icon>
        Terug
      </v-btn>
      <div class="tw-w-full tw-text-center tw-mb-8">
        <h1 class="tw-text-5xl tw-leading-tight tw-text-primary-600 tw-font-bold">Locatie toevoegen</h1>
        <template v-if="showFields && selectedActivities.length">
          <h3 class="tw-mt-16 tw-text-lg tw-text-black tw-font-bold">Gekozen categorieën:</h3>
          <div class="tw-text-center tw-pt-8 tw-mb-8">
            <v-chip
              v-for="activity in selectedActivities"
              :key="activity.id"
              class="tw-mx-4"
              close
              color="primary"
              outlined
              @click:close="removeSelectedActivity(activity)"
            >
              {{ activity.name }}
            </v-chip>
          </div>
        </template>
      </div>
    </div>
    <template v-if="!showFields">
      <v-slide-y-transition leave-absolute>
        <div class="
          tw-w-full
          tw-flex
          tw-px-32
          tw-max-w-page
          tw-absolute
          tw-top-1/2
          tw-left-1/2
          tw-transform
              tw--translate-x-1/2
              tw--translate-y-1/2
          tw-w-full
        ">
          <div class="tw-self-center tw-w-2/5 tw-pr-32">
            <h2 class="tw-text-5xl tw-leading-tight tw-text-black-900 tw-font-bold">Kies een categorie</h2>
            <p class="tw-mt-24 tw-text-black-900">Wat voor soort ruimte wil je verhuren?<br> Selecteer één of meerdere opties om door te gaan</p>
            <v-autocomplete
                class="tw-mt-24"
                v-model="selectedActivities"
                :items="activities"
                :loading="isLoadingActivities"
                color="primary"
                hide-no-data
                hide-selected
                item-text="name"
                item-value="id"
                label="Type ruimte"
                placeholder="Kies een categorie"
                hide-details
                return-object
                clearable
                multiple
            ></v-autocomplete>
            <v-btn
                class="tw-w-full tw-font-bold tw-mt-32"
                color="primary"
                :disabled="!selectedActivities.length"
                tile
                large
                @click="showFields = true;"
            >
                Verder
            </v-btn>
          </div>
          <div class="tw-w-3/5 tw-pl-32">
            <img class="fade-in-right" src="@/assets/images/living-space.jpg">
          </div>
        </div>
      </v-slide-y-transition>
    </template>
    <template v-if="showFields && selectedActivities.length">
      <v-slide-y-transition leave-absolute>
        <div class="
          tw-w-full
          tw-flex
          tw-flex-wrap
          tw-px-32
          tw-max-w-page
          tw-w-full
          tw-mx-auto
        ">
          <v-form v-model="isFormValid" class="tw-w-full">
            <LocationFields
              :payload="createPayload"
            />
          </v-form>
          <div class="tw-w-full tw-flex tw-justify-end tw-pb-64">
            <v-btn
              color="primary"
              large
              tile
              @click.native="createLocation"
              :loading="isCreating"
              :disabled="!isFormValid || isCreating"
            >
              Publiceren
            </v-btn>
          </div>
        </div>
      </v-slide-y-transition>
    </template>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import _ from 'lodash';
  import { Activity } from '@/models/Activity';
  import { Location } from '@/models/Location';
  import { createPayload } from '@/models/Location';

  @Component<Profile>({
    components: {}
  })
  export default class Profile extends Vue {
    protected selectedActivities: Activity[] = [];

    protected activities: Activity[] = [];

    protected showFields = false;

    protected isLoadingActivities = true;

    protected isLoading = true;

    protected isCreating = false;

    protected isFormValid = false;

    protected createPayload: createPayload = {
      user: this.$store.getters['Auth/loggedInUser'].id,
      title: '',
      description: '',
      images: [],
    };

    protected async mounted(): Promise<void> {
      console.log('this.createPayload', this.createPayload);
      await this.getActivities();
      this.isLoading = false;
    }

    protected removeSelectedActivity(activity: Activity) {
      this.selectedActivities = this.selectedActivities.filter((indexedActivity: Activity) => indexedActivity.id !== activity.id);

      if (!this.selectedActivities.length) {
        this.showFields = false;
      }
    }

    protected async createLocation(): Promise<void> {
      this.isCreating = true;
      try {
        const location: Location = await new Location().create(this.createPayload)
        this.$router.push(`/locations/${location.id}`)
      } catch(error) {
        console.log(error);
      } finally {
        this.isCreating = false;
      }
    }

    protected async getActivities(): Promise<void> {
      await new Activity().list()
      .then((activities: Activity[]) => {
          this.activities = activities;
          this.isLoadingActivities = false;
      })
      .catch((error: any) => console.log(error));
    }
  }
</script>

<style lang="scss">
  .fade-in-right {
    -webkit-animation: fade-in-right 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
            animation: fade-in-right 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  }

  /* ----------------------------------------------
  * Generated by Animista on 2021-4-7 17:53:41
  * Licensed under FreeBSD License.
  * See http://animista.net/license for more info. 
  * w: http://animista.net, t: @cssanimista
  * ---------------------------------------------- */

  /**
  * ----------------------------------------
  * animation fade-in-right
  * ----------------------------------------
  */
  @-webkit-keyframes fade-in-right {
    0% {
      -webkit-transform: translateX(25px);
              transform: translateX(25px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
              transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes fade-in-right {
    0% {
      -webkit-transform: translateX(25px);
              transform: translateX(25px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
              transform: translateX(0);
      opacity: 1;
    }
  }

</style>
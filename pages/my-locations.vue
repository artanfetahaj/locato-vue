<template>
  <div class="tw-w-full tw-max-w-page tw-mx-auto tw-flex-wrap tw-py-40 tw-px-32">
    <div class="tw-flex tw-justify-between tw-mb-32">
      <h1 class="tw-text-5xl tw-font-bold">Jouw locaties</h1>
      <v-btn
        class="tw-font-bold tw-uppercase tw-self-center"
        color="primary"
        outlined
        rounded
        to="/locations/new"
      >
        <v-icon class="tw-text-lg tw-mr-8">mdi-plus-circle</v-icon>
        toevoegen
      </v-btn>
    </div>
    <MiDataTable :options="tableOptions">
      <template v-slot:item.images="item">
        <img class="tw-h-24 tw-w-24 tw-object-cover" :src="item.images[0].file_url"/>
      </template>
      <template v-slot:item.title="item">
        <NuxtLink :to="`/locations/${item.id}`">
          <span class="tw-font-bold tw-text-black-900 hover:tw-text-primary-600">{{item.title}}</span>
        </NuxtLink>
      </template>
      <template v-slot:item.views="item">
        <div class="tw-flex tw-justify-center tw-text-base tw-text-black-900">
          <span class="tw-self-center tw-mr-4">0</span>
          <v-icon class="tw-self-center tw-text-black-900 tw-text-lg">
              mdi-eye
          </v-icon>
        </div>
      </template>
    </MiDataTable>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Location } from '@/models/Location';
  import _ from 'lodash';
  import { MiDataTableOptions } from '@/components/MiDataTable.vue';
import { User } from '~/models/User';

  @Component<Profile>({
    components: {}
  })
  export default class Profile extends Vue {
    protected locations: Location[] = [];

    protected async mounted(): Promise<void> {
      //
    }

    protected get tableOptions(): MiDataTableOptions {
      return {
        model: new Location().include('user').filter('user.uuid', this.user.id),
        headers: [
          // {
          //   text: 'Thumbnail',
          //   value: 'images',
          //   width: '4%',
          // },
          {
            text: 'Titel',
            value: 'title',
            width: '25%',
          },
          {
            text: 'Aantal weergaven',
            value: 'views',
            width: '5%',
            align: 'end',
          },
        ],
      }
    }

    protected get user(): User {
        return this.$store.getters['Auth/loggedInUser'];
    }

  }
</script>



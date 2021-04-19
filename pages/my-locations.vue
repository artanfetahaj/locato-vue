<template>
  <div class="tw-w-full tw-max-w-page tw-mx-auto tw-flex-wrap tw-py-40 tw-px-32">
    <h1 class="tw-w-full tw-text-5xl tw-font-bold tw-mb-32">Jouw locaties</h1>
    <MiDataTable :options="tableOptions" />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Location } from '@/models/Location';
  import _ from 'lodash';
  import { MiDataTableOptions } from '@/components/MiDataTable.vue';

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
        model: new Location(),
        headers: [
          {
            text: 'Titel',
            value: 'title',
          },
          {
            text: 'Beschrijving',
            value: 'description',
          },
          {
            text: 'Aantal weergaven',
            value: '',
          },
        ],
      }
    }
  }
</script>



<template>
  <div >
    <LocationOverview
      :locations="locations"
      :filters="filters"
      title="Jouw favorieten"
      :isLoading="isLoadingLocations"
    />
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { Location } from '@/models/Location';
  import { FilterItem } from '@/components/FilterButton.vue';
  import _ from 'lodash';

  @Component<Favorites>({
  })
  export default class Favorites extends Vue {
    protected isLoadingLocations = false;

    protected get filters(): FilterItem[] {
      return [
        {
            label: 'Prijs',
            key: 'price',
            type: 'price',
        },
      ];
    }

    protected get locations(): Location[] {
      // return this.$store.getters['Auth/loggedInUser'].saved_locations;
      return [];
    }
}
</script>

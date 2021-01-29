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
  import { Location } from '@/models/Location.ts';
  import { FilterItem } from '@/components/FilterButton.vue';
import _ from 'lodash';

  @Component<Favorites>({
  })
  export default class Favorites extends Vue {
    protected isLoadingLocations = false;

    protected async mounted(): Promise<void> {

      console.log(this.locations);
    }

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
      return this.$store.getters.loggedInUser.saved_locations
    }

// protected async asyncData({ params, redirect }) {
//     await this.$axios.get(`/locations?province=${params.province}`)
//           .then((response: any) => {
//               console.log(response);
//           })
//           .catch((e) => console.log(e));

//   const filteredMountain = mountains.find(
//     (el) =>
//       el.continent.toLowerCase() === params.continent &&
//       el.slug === params.mountain
//   )
//   if (filteredMountain) {
//     return {
//       continent: filteredMountain.continent,
//       mountain: filteredMountain.title
//     }
//   } else {
//     redirect('/')
//   }
// }
}
</script>

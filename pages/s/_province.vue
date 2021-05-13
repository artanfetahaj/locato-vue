<template>
  <div >
    <LocationOverview
      :locations="locations"
      :filters="filters"
      :title="`Locaties in ${$route.params.province}`"
      :isLoading="isLoadingLocations"
    />
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { Location } from '@/models/Location';
  import { FilterItem } from '@/components/FilterButton.vue';

  @Component<provinceLocations>({
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
  export default class provinceLocations extends Vue {
    protected locations: Location[] = [];

    protected isLoadingLocations = true;

    protected async mounted(): Promise<void> {
      await this.getLocations();
    }

    protected async getLocations(): Promise<void> {
      await new Location().all()
            .then((locations: Location[]) => {
                this.locations = locations;
                this.isLoadingLocations = false;
            })
            .catch((e) => console.log(e));
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

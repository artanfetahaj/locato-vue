<template>
    <div class="tw-p-32 tw-max-w-page tw-mx-auto">
        <div class="tw-w-full">
            <span>{{ locations.length }} ruimtes gevonden</span>
            <h1 class="tw-text-black-900 tw-text-4xl tw-font-bold tw-mb-8">{{ title }}</h1>
        </div>
        <div class="tw-w-full tw-bg-white tw-flex tw-flex-wrap tw--mx-8 tw-mb-32">
            <DynamicFilter :filters="filters" />
        </div>
        <v-layout wrap align-center class="tw--m-8">
            <template v-if="!isLoading && locations.length">
                <v-flex
                    class="tw-p-8"
                    v-for="location in locations"
                    :key="location.id"
                    xs12
                    sm6
                    md4
                >
                    <LocationCard :location="location" />
                </v-flex>
            </template>
            <template v-else>
                <v-flex
                    class="tw-p-8"
                    v-for="index in 15"
                    :key="index"
                    xs12
                    md4
                >
                    <v-skeleton-loader
                        type="card, list-item"
                        class="w-full"
                    ></v-skeleton-loader>
                </v-flex>
            </template>
        </v-layout>
        <div class="tw-w-full tw-bg-white tw-flex tw-flex-wrap tw--mx-8">
            
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { FilterItem } from '@/components/FilterButton.vue';

    @Component<LocationOverview>({})
    export default class LocationOverview extends Vue {
        @Prop()
        protected locations!: Location[];

        @Prop()
        protected filters!: FilterItem[];

        @Prop()
        protected title!: string;

        @Prop()
        protected isLoading!: boolean;
    
        protected async mounted(): Promise<void> {};
    }
</script>

<style lang="scss">
   
</style>
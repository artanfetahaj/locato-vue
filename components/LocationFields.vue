<template>
    <div class="tw-flex tw-w-full tw-flex-wrap tw-pt-16">
        <div class="tw-flex tw-w-full tw-flex-wrap tw-pt-32 tw-border-t-2 tw-border-gray-200">
            <div class="tw-w-full tw-flex tw-mb-32">
                <span class="tw-w-1/3 tw-pl-16 tw-font-bold tw-text-black tw-self-top tw-mb-24">Foto's</span>
                <div class="tw-w-2/3 tw-pl-16">
                    <LocationImageEditor
                        v-model="locationPayload.images"
                    />
                </div>
            </div>
            <div class="tw-w-full tw-flex">
                <span class="tw-w-1/3 tw-pl-16 tw-font-bold tw-text-black tw-self-top tw-mb-24">Titel</span>
                <v-text-field
                    class="tw-w-2/3 tw-pl-16"
                    solo
                    flat
                    v-model="locationPayload.title"
                    label="Titel"
                    :rules="[v => !!v || 'Geef je locatie een titel']"
                    outlined
                />
            </div>
            <div class="tw-w-full tw-flex">
                <span class="tw-w-1/3 tw-pl-16 tw-font-bold tw-text-black tw-self-top tw-mb-24">Beschrijving</span>
                <v-textarea
                    height="300"
                    class="tw-w-2/3 tw-pl-16"
                    solo
                    flat
                    v-model="locationPayload.description"
                    label="Beschrijving"
                    :rules="[v => !!v || 'Omschrijf de locatie']"
                    outlined
                />
            </div>
            <div class="tw-w-full tw-flex">
                <span class="tw-w-1/3 tw-pl-16 tw-font-bold tw-text-black tw-self-top tw-mb-24">Max. aantal aanwezigen</span>
                <v-text-field
                    type="number"
                    class="tw-w-2/3 tw-pl-16"
                    solo
                    flat
                    v-model="locationPayload.capacity"
                    label="Max. aantal aanwezigen"
                    :rules="[v => !!v || 'Een maximaal aantal aanwezigen is verplicht']"
                    outlined
                >
                    <template v-slot:prepend-inner>
                        <v-icon class="tw-text-lg tw-text-primary-500 tw-mr-4">mdi-account</v-icon>
                    </template>
                </v-text-field>
            </div>
            <div class="tw-w-full tw-flex">
                <span class="tw-w-1/3 tw-pl-16 tw-font-bold tw-text-black tw-self-top tw-mb-24">Prijs per dagdeel</span>
                <v-text-field
                    type="number"
                    class="tw-w-2/3 tw-pl-16"
                    solo
                    flat
                    v-model="locationPayload.price_per_daypart"
                    label="Prijs per dagdeel"
                    :rules="[v => !!v || 'Een prijs per dagdeel is verplicht']"
                    outlined
                >
                    <template v-slot:prepend-inner>
                        <v-icon class="tw-text-lg tw-text-primary-500 tw-mr-4">mdi-currency-eur</v-icon>
                    </template>
                </v-text-field>
            </div>
            <div class="tw-w-full tw-flex">
                <span class="tw-w-1/3"></span>
                <v-checkbox v-model="locationPayload.daypart_rent_only" class="tw-w-2/3 tw-pl-16 tw-pt-0 tw-mt-0 tw-mb-8" label="Locatie alleen per dagdeel verhuren" />
            </div>
            <div v-if="!locationPayload.daypart_rent_only" class="tw-w-full tw-flex">
                <span class="tw-w-1/3 tw-pl-16 tw-font-bold tw-text-black tw-self-top tw-mb-24">Prijs per uur</span>
                <v-text-field
                    type="number"
                    class="tw-w-2/3 tw-pl-16"
                    solo
                    flat
                    v-model="locationPayload.price_per_hour"
                    label="Prijs per uur"
                    outlined
                >
                    <template v-slot:prepend-inner>
                        <v-icon class="tw-text-lg tw-text-primary-500 tw-mr-4">mdi-currency-eur</v-icon>
                    </template>
                </v-text-field>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, PropSync } from 'vue-property-decorator';
    import { createPayload, updatePayload } from '@/models/Location'

    @Component<LocationFields>({})
    export default class LocationFields extends Vue {
        @PropSync('payload')
        protected locationPayload!: createPayload | updatePayload;

        protected mounted(): void {};
    }

</script>
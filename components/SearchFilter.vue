<template>
    <div class="tw-w-full tw-bg-white tw-rounded-lg tw-p-16 tw-px-8">
        <div class="tw-relative tw-flex tw-w-full -tw-mx-8 tw-pr-128">
            <div class="tw-w-1/2 tw-mx-8">
                <v-autocomplete
                    v-model="activity"
                    :items="activities"
                    :loading="isLoadingActivities"
                    color="primary"
                    hide-no-data
                    hide-selected
                    item-text="name"
                    item-value="id"
                    label="Waarvoor zoek je een ruimte?"
                    placeholder="Typ om te zoeken"
                    hide-details
                    return-object
                    clearable
                ></v-autocomplete>
            </div>
            <div class="tw-w-1/2 tw-mx-8">
                <v-autocomplete
                    v-model="province"
                    :items="provinces"
                    :loading="isLoadingProvinces"
                    color="primary"
                    hide-no-data
                    hide-selected
                    item-text="name"
                    item-value="id"
                    label="Waar?"
                    placeholder="Typ om te zoeken"
                    hide-details
                    return-object
                    clearable
                ></v-autocomplete>
            </div>
            <div class="tw-w-128 tw-absolute tw-right-0 tw-top-1/2 tw-transform tw--translate-y-1/2 tw-text-center">
                <v-btn
                    class="tw-font-semibold tw-capitalize"
                    color="primary"
                    rounded
                    @click="search()"
                    :disabled="isDisabled"
                >
                    Zoeken
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { Activity } from '@/models/Activity';
    import { Province } from '@/models/Province';

    @Component<MainHeader>({
        components: {},
    })
    export default class MainHeader extends Vue {
        protected activity: Activity | null = null;

        protected province: Province | null = null;

        protected activities: Activity[] = [];

        protected provinces: Province[] = [];

        protected isLoadingActivities = true;
        protected isLoadingProvinces = true;
        protected isLoading = true;
    
        protected async mounted(): Promise<void> {
            await this.getActivities();
            await this.getProvinces();
            this.isLoading = false;
        }

        protected async getActivities(): Promise<void> {
            await new Activity().list()
            .then((activities: Activity[]) => {
                this.activities = activities;
                this.isLoadingActivities = false;
            })
            .catch((error: any) => console.log(error));
        }

        protected async getProvinces(): Promise<void> {
            await new Province().list()
            .then((provinces: Province[]) => {
                this.provinces = provinces;
                this.isLoadingProvinces = false;
            })
            .catch((error: any) => console.log(error));
        }

        protected search(): void {
            if (!this.province) {
                return;
            }
            this.$router.push(`/s/${this.province.name}`)
        }

        protected get isDisabled(): boolean {
            return !this.activity || !this.province;
        }
    }
</script>
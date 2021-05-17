<template>
    <div class="tw-flex h-full">
        <v-icon class="tw-text-xl tw-center-self tw-mb-2 tw-text-black-900">mdi-account-supervisor</v-icon>
        <span class="tw-ml-4 tw-text-black-900 tw-text-lg">{{ attendees }}{{ !compact ? ' aanwezigen' : '' }}</span>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';

    @Component<LocationOverview>({
        components: {},
    })
    export default class LocationOverview extends Vue {
        @Prop()
        protected attendees!: number;

        @Prop({ default: false })
        protected compact!: boolean;
    }
</script>
<template>
    <div class="mainHeader tw-relative tw-h-full tw-flex-wrap tw-w-screen tw-min-h-600 tw-bg-primary-200">
        <div class="
            tw-w-full
            tw-max-w-page
            tw-px-32
            tw-absolute
            tw-top-1/2
            tw-left-1/2
            tw-transform
                tw--translate-x-1/2
                tw--translate-y-1/2
            tw-w-full
        ">
            <h1 class="tw-text-white tw-font-bold">Vind de perfecte locatie voor jouw ideeën</h1>
            <SearchFilter />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    

    @Component<MainHeader>({})
    export default class MainHeader extends Vue {
    
        protected mounted(): void {}

    }
</script>

<style lang="scss">
    .mainHeader {
        background-image: url('~assets/images/living-space.jpg');
        background-size: cover;
        background-position: center center;
        position: relative;

        &:before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: black;
            opacity: .35;
        }

        h1 {
            font-size: 3.7rem !important;
            line-height: 1;
            max-width: 670px;
            margin-bottom: 2rem;
        }
    }
</style>
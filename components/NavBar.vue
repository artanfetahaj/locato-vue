<template>
    <div
        class="
            navBar
            tw-z-10
            tw-top-0
            tw-left-0
            tw-h-64
            tw-w-full
            tw-relative
        " 
        :class="transparent ? 'transparent' : ''" >
        <div class="tw-relative tw-max-w-page tw-mx-auto tw-h-full tw-flex tw-justify-between tw-px-32">
            <div class="tw-inline-block tw-h-full tw-w-auto">
                <div class="tw-flex tw-h-full">
                    <NuxtLink class="tw-self-center" to="/">
                        <span
                            :class="whiteLogo ? 'tw-text-white' : 'tw-text-primary-500'"
                            class="tw-text-3xl tw-font-black"
                        >Locato</span>
                    </NuxtLink>
                </div>
            </div>
            <div class="tw-inline-block tw-h-full">
                <div class="tw-flex tw-h-full">
                    <v-btn
                        nuxt
                        to="/host"
                        class="tw-self-center mr-4 tw-capitalize tw-h-32"
                        :class="[
                            transparent ? '' : 'tw-bg-gray-100',
                        ]"
                        :color="transparent ? 'white' : 'gray'"
                        rounded
                        text
                    >
                        Locatie verhuren
                    </v-btn>
                    <user-menu
                        class="tw-self-center"
                        v-on:show-login="$emit('show-login');"
                        v-on:show-register="$emit('show-register');"
                        :transparent="transparent"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import UserMenu from '@/components/UserMenu.vue';

    @Component<NavBar>({
        components: {
            'user-menu': UserMenu,
        },
    })
    export default class NavBar extends Vue {
        @Prop()
        protected transparent!: boolean;

        @Prop()
        protected whiteLogo!: boolean;
    }
</script>

<style lang="scss">
    .navBar {
        border-bottom: 1px solid #D5DBE0!important;

        

        &.transparent {
            border-bottom: none!important;
        }
    }
</style>
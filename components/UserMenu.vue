<template>
    <v-menu
        transition="slide-y-transition"
        offset-y
        offset-x
        bottom
        left
        nudge-right="64"
        nudge-bottom="16"
        light
        min-width="250"
        close-on-content-click
    >
        <template v-slot:activator="{ on }">
            <div
                v-on="on"
                class="
                    tw-self-center
                    tw-justify-between
                    tw-cursor-pointer
                    tw-flex
                    tw-h-32
                    tw-px-3
                    tw-w-64
                    tw-rounded-full
                "
                :class="transparent ? 'tw-ripple-bg-white tw-bg-white' : 'tw-ripple-bg-gray-200 tw-bg-gray-200'"
            >
                <div v-if="$store.getters['Auth/isAuthenticated']" class="tw-self-center pl-2">
                    <v-avatar
                        :width="22"
                        :height="22"
                        :min-width="22"
                        :min-height="22"
                    >
                        <img
                            v-if="user.avatar"
                            class="tw-object-cover"
                            :src="user.avatar"
                            alt="John"
                        >
                        <div class="tw-bg-gray-100 tw-w-full tw-h-full">
                            <v-icon v-if="!user.avatar" class="tw-text-2xl tw-mb-4 tw-pb-2 tw-text-gray-500">mdi-account</v-icon>
                        </div>
                    </v-avatar>
                </div>
                <v-icon
                    v-if="!$store.getters['Auth/isAuthenticated']"
                    :class="transparent ? 'tw-text-primary-500' : 'tw-text-black-900'"
                    class="pl-3 tw-self-center tw-text-xl"
                >
                    mdi-account-outline
                </v-icon>
                <v-icon
                    :class="transparent ? 'tw-text-primary-500' : 'tw-text-black-900'"
                    class="pr-3 tw-self-center tw-text-xl"
                >
                    mdi-menu
                </v-icon>
            </div>
        </template>
        <v-list>
            <template
                v-for="(item, index) in items"
            >
                <template v-if="item.link">
                    <NuxtLink :key="index" :to="item.link">
                        <v-list-item
                            class="tw-cursor-pointer hover:tw-bg-gray-100"
                            :class="item.separator ? 'tw-border-b-2 tw-border-gray-200' : ''"
                            rounded="lg"
                        >   
                            <v-list-item-title>
                                {{ item.title }}
                            </v-list-item-title>
                        </v-list-item>
                    </NuxtLink>
                </template>
                
                
                <template v-else>
                    <v-list-item
                        :key="index"
                        class="tw-cursor-pointer hover:tw-bg-gray-100"
                        :class="item.separator ? 'tw-border-b-2 tw-border-gray-200' : ''"
                        rounded="lg"
                        @click="item.action"
                    >   
                        <v-list-item-title>
                            {{ item.title }}
                        </v-list-item-title>
                    </v-list-item>
                </template>
            </v-list-item>
            </template>
            
        </v-list>
    </v-menu>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { User } from '@/models/User';

    @Component<UserMenu>({
        components: {},
    })
    export default class UserMenu extends Vue {
        @Prop()
        protected transparent!: boolean;

        protected unauthenticatedItems: navigationItem[] = [
            {
                title: 'Aanmelden',
                action: () => {
                    this.$store.commit('Auth/ChangeModalType', 'register');
                    this.$store.commit('Auth/showAuthModal', true);
                },
            },
            { 
                title: 'Inloggen',
                action: () => {
                    this.$store.commit('Auth/ChangeModalType', 'login');
                    this.$store.commit('Auth/showAuthModal', true);
                },
                separator: true,
            },
            {
                title: 'Locatie verhuren',
                link: '/host',
            },
            { 
                title: 'Hulp',
                link: '/hulp',
            },
        ];

        protected authenticatedItems: navigationItem[] = [
            { 
                title: 'Jouw profiel',
                link: '/my-profile',
            },
            { 
                title: 'Jouw locaties',
                link: '/my-locations',
            },
            { 
                title: 'Favorieten',
                link: '/my-favorites',
                separator: true,
            },
            { 
                title: 'Uitloggen',
                action: () => {
                    this.$store.dispatch('Auth/userDeauthenticated');
                },
            },
            { 
                title: 'Hulp',
                link: '/hulp',
            },
        ];

        protected get items(): navigationItem[] {
            return this.$store.getters['Auth/isAuthenticated'] ? this.authenticatedItems : this.unauthenticatedItems;
        }

        protected get user(): User {
            return this.$store.getters['Auth/loggedInUser'];
        }
    }

    type navigationItem = {
        title: string,
        action?: Function,
        link?: string,
        separator?: boolean,
    };
</script>
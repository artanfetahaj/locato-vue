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
                <div v-if="$store.getters.isAuthenticated" class="tw-self-center pl-2">
                    <v-avatar
                        :width="22"
                        :height="22"
                        :min-width="22"
                        :min-height="22"
                    >
                        <img
                            class="tw-object-cover"
                            :src="`http://localhost:1337${user.avatar.url}`"
                            alt="John"
                        >
                    </v-avatar>
                </div>
                <v-icon
                    v-if="!$store.getters.isAuthenticated"
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
            <v-list-item
                v-for="(item, index) in items"
                :key="index"
                class="tw-cursor-pointer hover:tw-bg-gray-100"
                :class="item.separator ? 'tw-border-b tw-border-gray-500' : ''"
                rounded="lg"
                @click="item.action"
            >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
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
    
        protected mounted(): void {}

        protected unauthenticatedItems: navigationItem[] = [
            {
                title: 'Aanmelden',
                action: () => {
                    this.$emit('show-register');
                },
            },
            { 
                title: 'Inloggen',
                action: () => {
                    this.$emit('show-login');
                },
                separator: true,
            },
            {
                title: 'Locatie verhuren',
                action: '/verhuren',
            },
            { 
                title: 'Hulp',
                action: '/hulp',
            },
        ];

        protected authenticatedItems: navigationItem[] = [
            { 
                title: 'Mijn profiel',
                action: '/mijn-profiel',
            },
            { 
                title: 'Favorieten',
                action: '/mijn-favorieten',
            },
            { 
                title: 'Uitloggen',
                action: async () => {
                     await this.$auth.logout();
                },
            },
            { 
                title: 'Hulp',
                action: '/hulp',
            },
        ];

        protected get items(): navigationItem[] {
            return this.$store.getters.isAuthenticated ? this.authenticatedItems : this.unauthenticatedItems;
        }

        protected get user(): User {
            return this.$store.getters.loggedInUser;
        }
    }

    type navigationItem = {
        title: string,
        action: string | Function,
        separator?: boolean,
    };
</script>
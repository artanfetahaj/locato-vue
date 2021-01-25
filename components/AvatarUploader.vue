<template>
    <v-hover
        v-slot="{ hover }"
    >
        <v-avatar
            class="tw-cursor-pointer"
            :width="128"
            :height="128"
            :min-width="128"
            :min-height="128"
        >
            <v-fade-transition>
                <v-overlay
                    v-ripple
                    v-if="hover"
                    absolute
                    color="primary"
                    @click="close()"
                >
                    <v-icon
                        class="tw-text-white tw-text-4xl"
                    >
                        mdi-camera-plus-outline
                    </v-icon>
                </v-overlay>
            </v-fade-transition>
            <img
                class="tw-object-cover"
                :src="`http://localhost:1337${url}`"
                alt="John"
            >
        </v-avatar>
    </v-hover>
</template>


<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';

    @Component<FilterButton>({
        components: {},
    })
    export default class FilterButton extends Vue {
        @Prop()
        protected url!: string;

        protected async mounted(): Promise<void> {
            console.log('avatarUploader');
        }
    }
</script>
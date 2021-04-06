<template>
    <v-hover
        v-slot="{ hover }"
    >
        <v-avatar
            :src="url"
            class="tw-cursor-pointer"
            :width="128"
            :height="128"
            :min-width="128"
            :min-height="128"
            @click="$refs.fileInput.click();"
        >
            <v-fade-transition>
                <v-overlay
                    v-ripple
                    v-show="isUploading"
                    absolute
                    color="primary"
                    ref="overlay"
                >
                    <v-progress-circular
                        :width="3"
                        color="white"
                        indeterminate
                    ></v-progress-circular>
                </v-overlay>
            </v-fade-transition>
            <v-fade-transition>
                <v-overlay
                    v-ripple
                    v-show="hover"
                    absolute
                    color="primary"
                    ref="overlay"
                >
                    <form ref="uploadForm" @submit.prevent="processFile();">
                        <input type="file" name="avatar" ref="fileInput" class="tw-hidden" @change="handleFileChanged($event);" />
                        <input type="submit" ref="submit" class="tw-hidden" />
                    </form>
                    <v-icon
                        class="tw-text-white tw-text-4xl"
                    >
                        mdi-camera-plus-outline
                    </v-icon>
                </v-overlay>
            </v-fade-transition>
            <img
                v-if="url"
                class="tw-object-cover"
                :src="url"
                alt="John"
            >
            <div class="tw-bg-gray-100 tw-w-full tw-h-full">
                <v-icon class="tw-text-6xl tw-text-gray-500" v-if="!url">mdi-account</v-icon>
            </div>
        </v-avatar>
    </v-hover>
</template>


<script lang="ts">
    import { Component, Vue, Prop, PropSync } from 'vue-property-decorator';
    import FileToBase64 from '@/support/FileToBase64';
    import { User } from '@/models/User';

    @Component<AvatarUploader>({
        components: {},
    })
    export default class AvatarUploader extends Vue {
        @PropSync('src')
        protected url!: string;

        @Prop()
        protected userId!: string;

        protected isUploading = false;

        protected error = '';

        protected fileList: FileList | null = null;

        protected handleFileChanged(event: any): void {
            this.fileList = event.target.files;
            (this.$refs.submit as HTMLFormElement).click();
        }

        protected async processFile() {
            if (!this.fileList) {
                return;
            }

            this.isUploading = true;
            const file = await FileToBase64(this.fileList[0])

            await new User({id: this.userId})
                .put({avatar: file})
                .then((user: User) => {
                    this.$emit('avatarUpdated', user);
                    this.isUploading = false;
                })
                .catch((e) => {
                    this.isUploading = false;
                    this.error = e.response.data.message;
                });
        }
        
        protected get uploadForm(): HTMLFormElement {
            return this.$refs.uploadForm as HTMLFormElement;
        }
    }
</script>
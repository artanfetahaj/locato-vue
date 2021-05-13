<template>
    <v-hover
        v-slot="{ hover }"
    >
        <div 
            :class="image.file ? 'tw-border-solid' : 'tw-border-dashed'"
            class="
                tw-h-full
                tw-w-full
                tw-border
                tw-border-2
                tw-border-primary-500
                tw-cursor-pointer
                tw-relative
            "
        >
            <v-fade-transition>
                <v-overlay
                    v-ripple
                    v-show="image.loading"
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
            <template v-if="!image.file">
                <v-overlay
                    v-ripple
                    v-show="hover"
                    absolute
                    color="primary"
                    ref="overlay"
                    @click.native="$refs.multipleFileInput.click();"
                >
                    <form ref="uploadForm">
                        <input type="file" name="avatar" ref="multipleFileInput" class="tw-hidden" @change="handleFileChanged($event);" multiple />
                    </form>
                    <v-icon
                        class="tw-text-white tw-text-4xl"
                    >
                        mdi-camera-plus-outline
                    </v-icon>
                </v-overlay>
            </template>
            <template v-if="image.file">
                <v-overlay
                    v-show="hover"
                    absolute
                    color="primary"
                >
                    <form ref="uploadForm">
                        <input type="file" name="avatar" ref="singleFileInput" class="tw-hidden" @change="handleSingleFileChanged($event);" multiple />
                    </form>
                    <v-btn
                        class="tw-mr-2"
                        @click.native="$refs.singleFileInput.click();"
                        color="white"
                        dark
                        fab
                        x-small
                    >
                        <v-icon
                            class="tw-text-primary-500"
                        >
                            mdi-pencil
                        </v-icon>
                    </v-btn>
                    <v-btn
                        class="tw-ml-2"
                        @click="removeFile()"
                        color="white"
                        dark
                        fab
                        x-small
                    >
                        <v-icon
                            class="tw-text-error-500"
                        >
                            mdi-delete
                        </v-icon>
                    </v-btn>
                </v-overlay>
            </template>
            <img v-if="image.file && image.preview" :src="image.preview" class="tw-h-full tw-w-full tw-object-cover"/>
        </div>
    </v-hover>
</template>

<script lang="ts">
    import { Component, PropSync, Vue } from 'vue-property-decorator';
    import { locationImage } from './LocationImageEditor.vue';

    @Component<ImageEditorCard>({})
    export default class ImageEditorCard extends Vue {
        @PropSync('entry')
        protected image!: locationImage;

        protected handleFileChanged(event: any): void {
            if (event.target.files.length === 1) {
                this.handleSingleFileChanged(event);
                return;
            }
            this.$emit('imagesUploaded', event.target.files)
        }

        protected handleSingleFileChanged(event: any): void {
            this.image.loading = true;

            let image = this.image;

            const fr = new FileReader();
            fr.onload = function () {
                image.file = event.target.files[0];
                image.preview = fr.result as string;
                image.loading = false;
            }
            fr.readAsDataURL(event.target.files[0]);
        }

        protected removeFile(): void {
            this.image.file = null;
            this.image.preview = '';
        }
    }

</script>
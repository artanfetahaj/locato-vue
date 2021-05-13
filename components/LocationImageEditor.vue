<template>
    <div
        :class="uploadedImageCount > 7 ? 'tw-grid-rows-3 tw-h-400' : 'tw-grid-rows-2 tw-grid-flow-col tw-h-240'"
        class="tw-grid tw-grid-cols-5 tw-gap-8 tw-w-full"
    >
        <!-- {{ uploadedImageCount }} -->
        <template v-for="image in images">
            <ImageEditorCard
                :ref="`imageEditor_${image.order}`" 
                :entry="image"
                v-if="image.file || image.order < 7"
                :key="image.order"
                :class="image.order === 0 ? 'tw-col-span-2 tw-row-span-2' : 'tw-col-span-1 tw-row-span-1'"
                @imagesUploaded="handleImagesUploaded($event)"
            />
        </template>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, PropSync, Watch } from 'vue-property-decorator';
    import { createPayload, updatePayload } from '@/models/Location';

    @Component<LocationImageEditor>({
        components: {
        },
    })
    export default class LocationImageEditor extends Vue {
        @PropSync('payload')
        protected locationPayload!: createPayload | updatePayload;

        protected fileList: FileList | null = null;        

        protected handleImagesUploaded(files: FileList): void {
            let imageList = this.imageList;
            Object.entries(files).forEach((file: [string, File], index: number) => {
                for(let image of imageList) {
                    if (!image.file) {
                        image.file = file[1] as File;
                        this.getImagePreview(image);
                        break;
                    }
                };
            });
        }

        protected getImagePreview(imageEntry: locationImage) {
            if (!imageEntry.file) {
                return '';
            }
            imageEntry.loading = true;

            const fr = new FileReader();
            fr.onload = function () {
                imageEntry.preview = fr.result as string;
                imageEntry.loading = false;
            }
            fr.readAsDataURL(imageEntry.file);
            
        }

        protected imageList: locationImage[] = [
            {
                file: null,
                order: 0,
                preview: '',
                loading: false,
            },
            {
                file: null,
                order: 1,
                preview: '',
                loading: false,
            },
            {
                file: null,
                order: 2,
                preview: '',
                loading: false,
            },
            {
                file: null,
                order: 3,
                preview: '',
                loading: false,
            },
            {
                file: null,
                order: 4,
                preview: '',
                loading: false,
            },
            {
                file: null,
                order: 5,
                preview: '',
                loading: false,
            },
            {
                file: null,
                order: 6,
                preview: '',
                loading: false,
            },
            {
                file: null,
                order: 7,
                preview: '',
                loading: false,
            },
            {
                file: null,
                order: 8,
                preview: '',
                loading: false,
            },
            {
                file: null,
                order: 9,
                preview: '',
                loading: false,
            },
            {
                file: null,
                order: 10,
                preview: '',
                loading: false,
            },
            {
                file: null,
                order: 11,
                preview: '',
                loading: false,
            },
            {
                file: null,
                order: 12,
                preview: '',
                loading: false,
            },
            {
                file: null,
                order: 12,
                preview: '',
                loading: false,
            },
        ];

        protected get images(): locationImage[] {
            return this.imageList;
        }

        protected get uploadedImageCount(): number {
            return this.imageList.filter((image: locationImage) => !! image.file).length;
        }

        @Watch('imageList', {deep: true})
        protected imagesChanged() {
            const images = this.imageList.filter((image: locationImage) => !! image.file);
            this.$emit('input', images.map((image: locationImage) => image.preview))
        }

    }

    export interface locationImage {
        file?: File | null;
        order?: number;
        preview?: string;
        loading?: boolean;
    }

</script>
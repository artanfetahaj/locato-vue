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
            @click="$refs.fileInput.click();"
        >
            <v-fade-transition>
                <v-overlay
                    v-ripple
                    v-show="hover"
                    absolute
                    color="primary"
                    ref="overlay"
                >
                    <form ref="uploadForm" @submit.prevent="uploadFile();">
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
                class="tw-object-cover"
                :src="url"
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

       protected fileList: FileList | null = null;

        protected async mounted(): Promise<void> {
            console.log('avatarUploader');

            this.$nextTick(function () {

                console.log('this.uploadForm', this.uploadForm);
                console.log('this.$refs.fileInput', this.$refs.fileInput);
                console.log('this.$refs.overlay', this.$refs.overlay);

            })
        }

        protected handleFileChanged(event: any): void {
            this.fileList = event.target.files;
            (this.$refs.submit as HTMLFormElement).click();
        }

        protected uploadFile() {

            if (!this.fileList) {
                return;
            }
            let form = this.$refs["uploadForm"] as any;
            let formData = new FormData();
            // let formElements = form.elements as HTMLFormElement[];
            // let payload = {
            //     files: [],
            //     ref: 'user',
            //     refId: this.$store.getters.loggedInUser.id,
            //     field: 'avatar',
            // };
            const file = this.fileList[0];
            formData.append(`files.avatar`, file, file.name);
            // formData.append('ref', 'User');
            // formData.append('refId', this.$store.getters.loggedInUser.id);
            // formData.append('field', 'avatar');
            this.$axios.put("http://localhost:1337/users/me", formData).then(res => console.log(res));
        }
        
        protected get uploadForm(): HTMLFormElement {
            return this.$refs.uploadForm as HTMLFormElement;
        }
    }
</script>
<template>
    <v-dialog
        v-model="show"
        width="500"
        transition="dialog-top-transition"
    >
        <v-card>
            <v-card-title>
                <div class="tw-w-full tw-flex tw-justify-between">
                    <span class="tw-self-center tw-text-2xl tw-font-bold">
                        {{ title }}
                    </span>
                    <v-btn
                        @click="close()"
                        color="gray"
                        depressed
                        fab
                        small
                    >
                        <v-icon
                            
                        >
                            mdi-close
                        </v-icon>
                    </v-btn>
                </div>
            </v-card-title>
            <v-card-text>
                <div class="tw-flex tw-flex-wrap tw-w-full">
                    <template v-if="!confirmationSent">
                        <RegisterFields
                            v-if="type === 'register'"
                            :payload="registerPayload"
                        />
                        <LoginFields
                            v-if="type === 'login'"
                            :payload="loginPayload"
                        />
                    </template>
                    <template v-if="confirmationSent">

                    </template>
                    <span class="loginError tw-text-error-500">{{error}}</span>
                </div>
                <div class="tw-flex tw-flex-wrap tw-w-full">
                    <div class="tw-w-full tw-flex tw-flex-wrap tw-mt-16 tw-justify-center">
                        <v-btn
                            class="tw-w-full tw-mb-16"
                            color="primary"
                            rounded
                            large
                            tile
                            :loading="isLoading"
                            @click="type === 'login' ? login() : register();"
                        >
                            <span class="tw-normal-case">{{ confirmLabel }}</span>
                        </v-btn>
                        <v-btn
                            class="tw-w-full"
                            color="gray"
                            outlined
                            tile
                            large
                            @click="''"
                        >
                            <div class="tw-flex">
                                <div class="tw-text-xl tw-mr-8 tw-self-center">
                                    <img class="tw-w-16 tw-h-16" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg">
                                </div>
                                <span class="tw-self-center tw-normal-case">Doorgaan met <span class="tw-font-bold">Google</span></span>
                            </div>
                            
                            
                        </v-btn>
                    </div>
                </div>
            </v-card-text>
            <v-card-actions>
                <div class="tw-w-full tw-flex tw-justify-between tw-p-16">
                    <span class="tw-center-self tw-text-lg">
                        {{ switchTypeMessage }}
                        <span
                            class="tw-font-bold tw-underline tw-cursor-pointer"
                            @click="switchTypes();"
                        >
                            {{ switchTypeLabel }}
                        </span>
                    </span>
                </div>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
    import { Component, Vue, Prop, PropSync, Watch, Emit } from 'vue-property-decorator';

    @Component<AuthModal>({
    components: {},
    })
    export default class AuthModal extends Vue {
        @PropSync('visible')
        protected show!: boolean;

        @PropSync('modalType')
        protected type!: modalType;

        protected error: any = null;

        protected successMessage = '';

        protected confirmationSent = false;

        protected isLoading = false;
    
        protected mounted(): void {};

        protected registerPayload: registerPayload = {
            username: '',
            email: '',
            password: '',
        };

        protected loginPayload: loginPayload = {
            identifier: '',
            password: '',
        };;

        protected switchTypes(): void {
            console.log('switchTypes');
            this.clearFields();

            if (this.type === 'login') {
                this.type = 'register';
            }

            if (this.type === 'register') {
                console.log('is register');
                this.$set(this, 'type', 'login');
                // this.type = 'login';
            }

            console.log(this.type);
        }

        protected clearFields(): void {
            this.registerPayload.username = '';
            this.registerPayload.email = '';
            this.registerPayload.password = '';
            this.loginPayload.identifier = '';
            this.loginPayload.password = '';
        }

        protected async register(): Promise<void> {
            if (!this.registerPayload.username || !this.registerPayload.email || !this.registerPayload.password) {
                return;
            }

            this.error = null;
            this.isLoading = true;
            this.$axios.setToken(false);

            await this.$axios.post("auth/local/register", {
                    username: this.registerPayload.username,
                    email: this.registerPayload.email,
                    password: this.registerPayload.password,
                })
            .then((response: any) => {
                this.isLoading = false;
                this.successMessage = `A confirmation link has been sent to your email account. Please click on the link to complete the registration process.`;
                this.confirmationSent = true;
            })
            .catch((e) => {
                this.isLoading = false;
                this.error = e.response.data.message[0].messages[0].message
            });
        };

        protected async login(): Promise<void> {
            if (!this.loginPayload.identifier || !this.loginPayload.password) {
                return;
            }

            this.error = null;
            this.isLoading = true;

            await this.$auth.loginWith("local", {
                data: {
                    identifier: this.loginPayload.identifier,
                    password: this.loginPayload.password,
                }
            })
            .then((response: any) => {
                this.isLoading = false;
                this.close();
            })
            .catch((e) => {
                this.isLoading = false;
                this.error = e.response.data.message[0].messages[0].message
            });
        };

        @Emit()
        protected close(): string {
            this.error = null;
            this.clearFields();
            this.confirmationSent = false;
            return '';
        }

        protected get title(): string {
            return this.type === 'login' ? 'Inloggen' : 'Aanmelden'
        }

        protected get switchTypeMessage(): string {
            return this.type === 'login' ? 'Heb je geen account?' : 'Heb je al een account?'
        }

        protected get switchTypeLabel(): string {
            return this.type === 'login' ? 'Aanmelden' : 'Inloggen'
        }

        protected get confirmLabel(): string {
            return this.type === 'login' ? 'Inloggen' : 'Aanmelden'
        }
    }

    export interface registerPayload {
        username: string,
        email: string,
        password: string,
    }

    export interface loginPayload {
        identifier: string,
        password: string,
    }

    export type modalType = 'login' | 'register';

</script>

<style lang="scss">
    @-webkit-keyframes shake-horizontal {
        0%,
        100% {
            -webkit-transform: translateX(0);
                    transform: translateX(0);
        }
        10%,
        30%,
        50%,
        70% {
            -webkit-transform: translateX(-5px);
                    transform: translateX(-5px);
        }
        20%,
        40%,
        60% {
            -webkit-transform: translateX(5px);
                    transform: translateX(5px);
        }
        80% {
            -webkit-transform: translateX(4px);
                    transform: translateX(4px);
        }
        90% {
            -webkit-transform: translateX(-4px);
                    transform: translateX(-4px);
        }
        }
        @keyframes shake-horizontal {
        0%,
        100% {
            -webkit-transform: translateX(0);
                    transform: translateX(0);
        }
        10%,
        30%,
        50%,
        70% {
            -webkit-transform: translateX(-5px);
                    transform: translateX(-5px);
        }
        20%,
        40%,
        60% {
            -webkit-transform: translateX(5px);
                    transform: translateX(5px);
        }
        80% {
            -webkit-transform: translateX(4px);
                    transform: translateX(4px);
        }
        90% {
            -webkit-transform: translateX(-4px);
                    transform: translateX(-4px);
        }
    }

    .loginError {
        -webkit-animation: shake-horizontal 0.8s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;
                animation: shake-horizontal 0.8s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;
    }


</style>
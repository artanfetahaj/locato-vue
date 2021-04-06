<template>
    <div class="tw-flex tw-w-full tw-flex-wrap">
        <div class="tw-w-full">
            <v-text-field
                v-model="authPayload.email"
                label="E-mail of gebruikersnaam"
            />
        </div>
        <div class="tw-w-full">
            <v-text-field
                v-model="authPayload.password"
                type="password"
                label="Wachtwoord"
            />
        </div>
        <div class="tw-w-full">
            <v-text-field
                v-model="authPayload.password_confirmation"
                type="password"
                label="Wachtwoord bevestigen"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, PropSync, Watch, Emit } from 'vue-property-decorator';
    import { registerPayload } from '@/components/AuthModal.vue'

    @Component<RegisterFields>({})
    export default class RegisterFields extends Vue {
        @PropSync('payload')
        protected authPayload!: registerPayload;

        protected mounted(): void {};
    }

</script>
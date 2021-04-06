<template>
    <div class="tw-flex tw-w-full tw-flex-wrap">
        <div class="tw-w-full">
            <v-text-field
                v-model="authPayload.email"
                label="E-mail"
            />
        </div>
        <div class="tw-w-full">
            <v-text-field
                v-model="authPayload.password"
                type="password"
                label="Wachtwoord"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, PropSync, Watch, Emit } from 'vue-property-decorator';
    import { loginPayload } from '@/components/AuthModal.vue'

    @Component<LoginFields>({})
    export default class LoginFields extends Vue {
        @PropSync('payload')
        protected authPayload!: loginPayload;

        protected mounted(): void {};
    }

</script>
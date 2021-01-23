<template>
  <v-app :light="true" class="tw-font-body">
    <NavBar
      v-on:show-login="showAuthModal('login')"
      v-on:show-register="showAuthModal('register')"
      :transparent="showTransparentNav"
    />
    <Nuxt />
    <AuthModal :visible="authModalVisible" :modalType="authModalType" v-on:close="authModalVisible = false" />
  </v-app>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import NavBar from '@/components/NavBar.vue';
import { modalType } from '@/components/AuthModal.vue';

  @Component<defaultLayout>({})
  export default class defaultLayout extends Vue {
      protected authModalVisible = false;

      protected authModalType: modalType = 'register';

      protected showAuthModal(type : modalType) {
        this.authModalType = type;
        this.authModalVisible = true;
      }

      protected get showTransparentNav(): boolean {
        return this.$route.path === '/';
      }
  }
</script>

<template>
  <v-app :light="true" class="tw-font-body">
    <NavBar
      v-on:show-login="showAuthModal('login')"
      v-on:show-register="showAuthModal('register')"
      :transparent="showTransparentNav"
    />
    <Nuxt />
    <AuthModal :show="$store.getters['Auth/authModalIsVisible']" :type="$store.getters['Auth/authModalType']" />
  </v-app>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import NavBar from '@/components/NavBar.vue';
  import { modalType } from '@/components/AuthModal.vue';
  import { User } from '@/models/User';
  import cookies from 'js-cookie';

  

  @Component<defaultLayout>({
    async fetch() {
        
    }
  })
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

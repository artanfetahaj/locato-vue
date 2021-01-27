<template>
  <div class="tw-w-full tw-max-w-page tw-mx-auto tw-flex-wrap tw-pt-40 tw-px-32">
    <h1 class="tw-w-full tw-text-5xl tw-font-bold">Mijn Profiel</h1>
    <div class="tw-w-full tw-flex tw-flex-wrap tw-mt-24">
      <div class="tw-w-full tw-border-b-2 tw-border-gray-300">
        <h3 class="tw-text-2xl tw-font-bold">Profiel foto</h3>
      </div>
      <AvatarUploader :url="user.avatar.formats.thumbnail.url" class="tw-my-32" />
    </div>
    <div class="tw-w-full tw-flex tw-flex-wrap tw-mt-16">
      <div class="tw-w-full tw-flex tw-justify-start tw-border-b-2 tw-border-gray-300 tw-py-8">
        <h3 class="tw-text-2xl tw-font-bold tw-self-center tw-mr-16">Basis informatie</h3>
        <v-btn
            @click="isEditing = !isEditing"
            color="gray"
            :dark="isEditing"
            depressed
            fab
            x-small
        >
            <v-icon
            >
                mdi-pencil
            </v-icon>
        </v-btn>
        <v-btn
            class="tw-ml-4"
            v-if="isEditing"
            @click="isEditing = false"
            color="primary"
            depressed
            fab
            x-small
        >
            <v-icon
            >
                mdi-content-save
            </v-icon>
        </v-btn>
      </div>
      <div class="tw-w-full tw-flex tw-justify-start">
        <v-container fluid class="tw-w-1/2 md:tw-w-full sm:tw-w-full tw-mt-32 tw-mr-0 tw-ml-0 tw-p-0">
          <v-row>
            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                outlined
                label="Voornaam"
                :disabled="!isEditing"
                value="Artan"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                outlined
                label="Achternaam"
                :disabled="!isEditing"
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col
              cols="12"
            >
              <v-text-field
                outlined
                label="E-mail"
                :disabled="!isEditing"
                :value="user.email"
              />
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { User } from '@/models/User';
  @Component<Profile>({
    components: {
    }
  })
  export default class Profile extends Vue {
    protected isEditing = false;

    protected mounted(): void {
      console.log(this.user);
    }

    protected get user(): User {
      return this.$store.getters.loggedInUser;
    }
  }
</script>



<template>
  <div class="tw-w-full tw-max-w-page tw-mx-auto tw-flex-wrap tw-py-40 tw-px-32">
    <template v-if="user">
      <h1 class="tw-w-full tw-text-5xl tw-font-bold">Jouw profiel</h1>
      <div class="tw-w-full tw-flex tw-flex-wrap tw-mt-24">
        <div class="tw-w-full tw-border-b-2 tw-border-gray-300">
          <h3 class="tw-text-2xl tw-font-bold">Profiel foto</h3>
        </div>
        <AvatarUploader :src="user.avatar" v-on:avatarUpdated="handleUserUpdated($event);" :userId="user.id" class="tw-my-32" />
      </div>
      <div class="tw-w-full tw-flex tw-flex-wrap tw-mt-16">
        <div class="tw-w-full tw-flex tw-justify-start tw-border-b-2 tw-border-gray-300 tw-py-8">
          <h3 class="tw-text-2xl tw-font-bold tw-self-center tw-mr-16">Basis informatie</h3>
          <v-btn
              @click="toggleEdit();"
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
              @click="updateUser();"
              color="primary"
              depressed
              :loading="isUpdating"
              :disabled="!isFormValid"
              fab
              x-small
          >
              <v-icon v-if="!isUpdated">
                  mdi-content-save
              </v-icon>
              <v-icon v-if="isUpdated">
                  mdi-check
              </v-icon>
          </v-btn>
        </div>
        <div class="tw-w-full tw-flex tw-justify-start">
          <v-container fluid class="tw-w-1/2 md:tw-w-full sm:tw-w-full tw-mt-32 tw-mr-0 tw-ml-0 tw-p-0">
            <v-form ref="profileForm" v-model="isFormValid" lazy-validation >
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="user.first_name"
                    outlined
                    label="Voornaam"
                    :disabled="!isEditing"
                    required
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="user.last_name"
                    outlined
                    label="Achternaam"
                    :disabled="!isEditing"
                    required
                  />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col
                  cols="12"
                  class="tw-flex"
                >
                  <v-text-field
                    v-model="user.email"
                    outlined
                    label="E-mail"
                    :disabled="!isEditing"
                    name="email"
                    :rules="[v => !!v || 'Email is vereist']"
                  />
                  <template v-if="!user.confirmed">
                    <div class="tw-flex tw-h-56 tw-px-16">
                      <v-btn
                          class="tw-self-center mr-4 tw-capitalize"
                          color="error"
                          rounded
                          text
                          small
                      >
                          <v-icon class="tw-text-lg tw-mr-4">mdi-alert-circle</v-icon>
                          Niet geverifieerd
                      </v-btn>
                    </div>
                  </template>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="user.phone"
                    outlined
                    label="Telefoonnumer"
                    :disabled="!isEditing"
                    name="phone"
                    prefix="+31"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { UpdateUserPayload, User } from '@/models/User';
  import _ from 'lodash';

  @Component<Profile>({
    components: {}
  })
  export default class Profile extends Vue {
    protected isEditing = false;

    protected isUpdating = false;

    protected isUpdated = false;

    protected user: User | null = null;

    protected isFormValid = false;

    protected error = '';

    protected beforeMount(): void {
      this.user = _.cloneDeep(this.$store.getters['Auth/loggedInUser']);
    }

    protected toggleEdit(): void {
      if (this.isEditing) {
        this.isEditing = false;
        this.user = _.cloneDeep(this.$store.getters['Auth/loggedInUser']);
        return;
      }

      this.isEditing = true;
      console.log('user', this.user);
    }

    protected validate(): void {
      (this.$refs.profileForm as any).validate();
    }

    protected async handleUserUpdated(user: User) {
      await this.$store.dispatch('Auth/userFetched', user);
      this.user = _.cloneDeep(this.$store.getters['Auth/loggedInUser']);
    }

    protected getUserUpdatePayload(): UpdateUserPayload {
      return {
        first_name: this.user?.first_name,
        last_name: this.user?.last_name,
        email: this.user?.email,
        avatar: this.user?.avatar,
      }
    }

    protected async updateUser(): Promise<void> {
      if (!this.user) {
        return;
      }

      this.validate();

      const payload = this.getUserUpdatePayload();

      if (this.isFormValid) {
        this.isUpdating = true;
        await new User({id: this.user.id})
          .put(payload)
          .then(async (user: User) => {
              await this.handleUserUpdated(user);
              this.isUpdating = false;
              this.isUpdated = true;

              setTimeout(() => {
                this.isUpdated = false;
                this.isEditing = false;
              }, 1000);

          })
          .catch((e) => {
              this.isUpdating = false;
              this.error = e.response.data.message;
          });
      }
    }
  }
</script>



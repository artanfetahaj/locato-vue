<template>
    <v-menu
        transition="slide-y-transition"
        offset-y
        bottom
        nudge-bottom="16"
        :min-width="250"
        light
        :close-on-content-click="false"
    >
        <template v-slot:activator="{ on }">
            <v-btn
                class="tw-font-semibold tw-capitalize tw-mx-8"
                color="black"
                outlined
                rounded
                v-on="on"
            >
                {{ filter.label }}
            </v-btn>
        </template>
        <div class="tw-bg-white tw-p-16">
            <slot name="menu" v-bind:filterItem="filter"></slot>
        </div>
        <!-- <v-list>
            <v-list-item
                v-for="(item, index) in items"
                :key="index"
                class="tw-cursor-pointer hover:tw-bg-gray-100"
                :class="item.separator ? 'tw-border-b tw-border-gray-500' : ''"
                rounded="lg"
                @click="item.action"
            >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list> -->
    </v-menu>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';

    @Component<FilterButton>({
        components: {},
    })
    export default class FilterButton extends Vue {
        @Prop()
        protected filter!: FilterItem[];

        protected async mounted(): Promise<void> {
            console.log('filterbutton');
        }
    }

    export type FilterItem = {
      label?: string,
      key?: string,
      type?: 'price' | 'date' | 'attendees',
    };
</script>
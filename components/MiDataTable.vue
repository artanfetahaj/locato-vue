<!-- eslint-disable -->
<template>
  <div class="mi-datatable-container">
    <div
      v-if="visible.header && ($slots['header'] || (options && options.title))"
      class="
        mi-data-table__header
        px-16
        py-8
        flex
      "
    >
      <!-- TODO: -->
      <Title v-if="options && options.title">
        {{ options.title }}
      </Title>
      <!-- <h2
        v-if="options && options.title"
        class="
          text-primary-500
          text-2xl
          font-bold
          flex-none
        "
      >
        {{ options.title }}
      </h2> -->
      <div
        class="
          flex
          justify-end
        "
      >
        <slot name="header"></slot>
      </div>
    </div>
    <div
      class="mi-data-table__search-container"
      :class="$slots[`append-to-search-bar`] ? 'flex' : ''"
    >
      <v-text-field
        v-if="visible.search"
        class="pt-0 mt-0 mi-text-field text-primary-500 flex-auto"
        :class="[
          visible.filters
            ? isShowingFilters
              ? 'mi-data-table-search--active-filter-icon'
              : ''
            : '',
          $slots[`append-to-search-bar`] ? 'flex flex-grow' : ''
        ]"
        :ref="`mi-data-table-search`"
        placeholder="Zoeken"
        prepend-inner-icon="mdi-magnify"
        :append-icon="visible.filters && $slots['filters'] ? 'mdi-tune' : null"
        clearable
        clear-icon="mdi-close"
        hide-details
        type="text"
        v-model="search"
        @input="searchDebounce"
        @click:append="handleFilterClick"
      ></v-text-field>
      <div
        v-if="$slots[`append-to-search-bar`]"
        class="flex flex-shrink border-b-2 border-transparent"
      >
        <div class=" border-l border-b border-gray-200 px-4 h-full" :class="visible.header && ($slots['header'] || (options && options.title)) ? 'relative pt-8 -top-8' : ''">
          <slot name="append-to-search-bar"/>
        </div>
      </div>
    </div>

    <!--HORIZONTAL FILTERS -->
    <div
      v-if="options && !options.verticalFilter && $slots['filters']"
      class="
        overflow-hidden
        transition-all
        ease-in-out
        duration-200
        mi-data-table-outer-filters
      "
      :style="`height: ${filtersHeight + 1}px`"
    >
      <div
        class="
          w-full
          mi-data-table-inner-filters
          p-8
          border-b
          border-gray-200
        "
      >
        <slot name="filters"></slot>
      </div>
    </div>

    <div
      v-if="tableOptions && tableOptions.verticalFilter && $slots['filters']"
      class="
        w-full
        mi-data-table-selected-filters
      "
    >
      <!-- TODO: FILTER COMPONENT -->
      <slot name="active-filters"></slot>
    </div>

    <div
      v-if="visible.select && $slots['bulk-actions']"
      class="
        mi-data-table__bulk-action-container
        flex
        border-b
        border-gray-200
        justify-start
        px-8
        py-4
      "
    >
      <slot name="bulk-actions"></slot>
    </div>

    <div class="flex flex-row">
      <div
        v-if="tableOptions.verticalFilter && $slots['filters']"
        class="
          transition-all
          ease-in-out
          duration-300
          border-r
          border-gray-200
          p-8
          overflow-hidden
          mi-data-table-vertical-filter
        "
        :class="[
          verticalFilterWidth,
          isShowingFilters ? 'cursor-auto' : 'cursor-pointer',
          !isShowingFilters ? 'mi-data-table-vertical-filter--peekable' : '',
        ]"

        @click="showVerticalFilter"
      >

      <!-- @mouseover="toggleVerticalFilterPeek"
        @mouseover="toggleVerticalFilterPeek" -->
        <slot name="filters"></slot>
      </div>
      <v-data-table
        class="
          transition-all
          ease-in-out
          duration-300
        "
        :class="dataTableWidth"
        v-if="options"
        v-model="selected"
        :page.sync="page"
        :headers="headers"
        :items="items"
        :hide-default-footer="true"
        :hide-default-header="!visible.columnHeaders"
        :disable-pagination="!visible.pagination"
        :show-select="visible.select"
        :item-key="options.itemKey"
        :single-select="options.singleSelect"
        :loading="isLoading"
        :loading-text="options.loadingText"
        :no-data-text="options.noDataText"
        :no-results-text="options.noResultsText"
        :server-items-length="total"
        :show-expand="options.expandable"
        @update:page="handlePageChange"
        @update:items-per-page="handlePerPageChange"
        @update:sort-by="handleSortBy"
        @update:sort-desc="handleSortDesc"
      >
        <template v-for="(index, name) in $scopedSlots" v-slot:[name]="{ item }">
          <slot v-if="name.includes('item.')" :name="name" v-bind="item"></slot>
        </template>
        <template v-if="options.expandable" v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <div class="v-data-table__expanded__content__inner">
              <slot name="expanded" v-bind="item"></slot>
            </div>
          </td>
        </template>
      </v-data-table>
    </div>
    <div
      v-if="visible.footer"
      class="
      text-right
      my-8
      "
    >
      <v-pagination
        v-if="lastPage > 1"
        v-model="page"
        :length="lastPage"
        total-visible="5"
        class="
          justify-end
          mb-8
        "
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { DataTableHeader } from 'vuetify';
import { Model } from '@/models/Model';
import debounce from 'debounce';
import { isArray } from 'lodash';

@Component<MiDataTable>({})
export default class MiDataTable extends Vue {
  protected get perPage(): number {
    if (this.$limit) { return this.$limit; }
    if (this.options && this.options.limit) { return this.options.limit; }
    return 25;
  }

  protected get headers(): DataTableHeader[] {
    if (! this.options || ! this.options.headers) {
      return [];
    }

    this.options.headers.forEach((header: DataTableHeader) => {
      if (header.value === 'actions') {
        header.sortable = false;
      }
    });

    return this.options.headers;
  }

  @Prop()
  protected options!: MiDataTableOptions;

  protected tableOptions: MiDataTableOptions = {
    model: new Model(),
    title: '',
    headers: [],
    limit: 25,
    itemKey: 'id', // wordt primary key model
    loadingText: 'Loading',
    noDataText: 'Geen data beschikbaar',
    noResultsText: 'Geen resultaten gevonden',
    compact: false,
    singleSelect: false,
    verticalFilter: true,
  };

  // eslint-disable-next-line
  @Prop({ default: () => { } })
  protected visibility!: MiDataTableVisibility;

  protected visible: MiDataTableVisibility = {
    pagination: true,
    header: true,
    columnHeaders: true,
    footer: true,
    select: false,
    search: true,
    filters: false,
  };

  protected isLoading = false;

  protected isShowingFilters = false;

  protected filtersHeight = 0;

  protected selected = [];

  protected total = 0;

  protected page = 1;

  protected lastPage = 1;

  protected $limit: number | null = null;

  protected search = '';

  protected searchDebounce: () => void = this.handleSearch();

  protected items: Model[] = [];

  @Prop({ default: '' })
  protected sortBy!: string;

  protected sortDesc = false;

  public initialize(): void {
    this.visible = { ...{}, ...this.visible, ...this.visibility };
    this.tableOptions = { ...{}, ...this.tableOptions, ...this.options };
    this.fetchSource();
  }

  public handleSearch(): () => void {
    return debounce(() => {
      this.page = 1;
      this.fetchSource();
    }, 400);
  }

  public refresh(): void {
    this.fetchSource();
  }

  protected mounted(): void {
    if (! this.options || ! this.options.lazy) {
      this.initialize();
    }
  }

  protected fetchSource(): void {
    if (! this.options || ! this.options.model) { return; }

    if (this.sortBy) {
      this.options.model.sort(this.sortBy, this.sortDesc ? 'DESC' : 'ASC');
    } else {
      this.options.model.clearSort();
    }

    this.isLoading = true;
    this.options.model
      .limit(this.perPage)
      // .filter('search', this.search)
      .page(this.page)
      .all()
      .then((items: Model[]) => {
        this.items = items;
        this.total = items[0] ? (items[0].meta as TableMeta).total as number : 0;
        this.lastPage = items[0] ? (items[0].meta as TableMeta).last_page as number : 1;
        this.isLoading = false;
      });
    // FIXME: Implement ErrorHandler;
    // .catch((error: AxiosError) => {
    //   alert(error);
    // });
  }

  protected handlePageChange(page: number): void {
    this.page = page;
    this.fetchSource();
  }

  protected handleSortBy(value: string | string[]): void {
    if (isArray(value) && value.length) {
      [this.sortBy] = value;
      return;
    }
    this.sortBy = '';
  }

  protected handleSortDesc(sortDesc: boolean | boolean[]): void {
    if (isArray(sortDesc) && sortDesc.length) {
      [this.sortDesc] = sortDesc;
    } else {
      this.sortDesc = false;
    }

    this.page = 1;
    this.fetchSource();
  }

  protected handlePerPageChange(perPage: number): void {
    // FIXME: Needs implementation
    this.isLoading = true;
    this.$limit = perPage;
    this.fetchSource();
  }

  protected handleFilterClick(event: MouseEvent): void {
    if (! this.tableOptions) { return; }

    if (this.tableOptions.verticalFilter) {
      this.animateVerticalFilterBar();
    } else {
      this.animateHorizontalFilterBar(event);
    }
  }

  protected animateVerticalFilterBar(): void {
    this.isShowingFilters = ! this.isShowingFilters;
  }

  protected animateHorizontalFilterBar(event: MouseEvent): void {
    const datatableContainer = (event.target as HTMLElement).closest('.mi-datatable-container');
    if (! datatableContainer) { return; }

    if (! this.isShowingFilters) {
      this.isShowingFilters = true;
      const innerFilters = datatableContainer.getElementsByClassName('mi-data-table-inner-filters');
      this.filtersHeight = innerFilters[0].clientHeight;
    } else {
      this.isShowingFilters = false;
      this.filtersHeight = 0;
    }
  }

  protected showVerticalFilter() {
    if (! this.isShowingFilters) {
      this.isShowingFilters = true;
    }
  }

  protected toggleVerticalFilterPeek(event: any) {
    console.log('event', event);
  }

  protected get dataTableWidth(): string {
    if (! this.tableOptions || ! this.tableOptions.verticalFilter) {
      return 'w-full';
    }

    return this.isShowingFilters ? 'w-3/4' : 'w-full';
  }

  protected get verticalFilterWidth(): string {
    if (! this.tableOptions || ! this.tableOptions.verticalFilter) {
      return 'w-filter';
    }

    return this.isShowingFilters ? 'w-1/4' : 'w-filter';
  }

  @Watch('selected')
  protected selectedChanged(): void {
    this.$emit('input', this.selected);
  }

  @Watch('options')
  protected optionsChanged(): void {
    this.initialize();
  }
}

export interface MiDataTableVisibility {
  pagination?: boolean;
  header?: boolean;
  columnHeaders?: boolean;
  footer?: boolean;
  select?: boolean;
  search?: boolean;
  filters?: boolean;
}

export interface MiDataTableOptions {
  model: Model;
  headers: DataTableHeader[];
  title?: string;
  limit?: DataTableLimit;
  itemKey?: string;
  loadingText?: string;
  noDataText?: string;
  noResultsText?: string;
  compact?: boolean;
  singleSelect?: boolean;
  lazy?: boolean;
  verticalFilter?: boolean;
  expandable?: boolean;
}

export interface TableMeta {
  [key: string]: string | number;
}

export type DataTableLimit = 1 | 5 | 10 | 15 | 25 | 50 | 100;

</script>

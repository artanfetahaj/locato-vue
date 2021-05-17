/* eslint-disable */
import Auth from '@/store/Auth'
import { getModule } from 'vuex-module-decorators';
import client from '@/support/Clients/Client';
import InstanceLoader from '@/support/InstanceLoader';
import { studlyCase } from '@/support/String';
import { AxiosError } from 'axios';
import { isUndefined, isNull, isObject } from 'lodash';
import { apiClient } from '@/support/Clients/ApiClient';
import { openDialog } from '@/support/Dialog';


export class Model {
  public meta?: object = {};

  // $name must be exactly the same as the class name.
  protected $name = 'Model';

  protected $endpoint = '';

  protected $primaryKey = 'id';

  protected $fillable: string[] = [];

  protected $page: number | null = null;

  protected $limit: number | null = null;

  protected $sort: SortOptions = {};

  protected $includes: string[] = [];

  protected filters: object = {};

  protected $admin = false;

  constructor(attributes: object = {}) {
    Object.assign(this, attributes);
  }

  public exists(): boolean {
    return !this.isNullOrUndefined((this as any)[this.$primaryKey]);
  }

  public first(): Promise<any> {
    return this.limit(1)
      .all()
      .then(
        (models: Model[]) => {
          if (
            models === undefined
            || !Array.isArray(models)
            || !(models[0] instanceof Model)
          ) {
            return Promise.reject(models);
          }
          Object.assign(this, models[0]);
          return Promise.resolve(models[0]);
        },
        (error: object) => Promise.reject(error),
      );
  }

  public endpoint(newEndpoint?: string): string {
    if (newEndpoint) {
      this.$endpoint = newEndpoint;
    }

    return this.$endpoint;
  }

  public all(): Promise<any> {
    const url = this.$endpoint;

    return this.request('get', url);
  }

  public find(id: string): Promise<any> {
    const url = `${this.$endpoint}/${id}`;

    return this.request('get', url);
  }

  public create(attributes?: object): Promise<any> {
    const url = this.$endpoint;

    return this.request('post', url, this.getPayload(attributes));
  }

  public put(attributes?: object): Promise<any> {
    const url = `${this.$endpoint}/${this.resolvePrimaryKey()}`;

    return this.request('put', url, this.getPayload(attributes));
  }

  public update(attributes?: object): Promise<any> {
    const url = `${this.$endpoint}${
      this.resolvePrimaryKey().length ? `/${this.resolvePrimaryKey()}` : ''
    }`;

    return this.request('patch', url, this.getPayload(attributes));
  }

  public updateMany(attributes?: object): Promise<any> {
    const url = this.$endpoint;
    return this.request('patch', url, this.getPayload(attributes));
  }

  public delete(attributes?: object): Promise<any> {
    const url = `${this.$endpoint}/${this.resolvePrimaryKey()}`;

    return this.request('delete', url, this.getPayload(attributes));
  }

  public deleteMany(payload: Record<string, string[]>) {
    const url = this.$endpoint;
    return this.request('delete', url, payload);
  }

  public getInstanceName() {
    return this.$name;
  }

  public admin() {
    this.$admin = true;

    return this;
  }

  public resolvePrimaryKey(): string {;
    return `${(this as any)[this.$primaryKey]}`;
  }

  public getPayload(attributes?: object): object {
    let payload: {[key: string]: any} = {};
    if (attributes === undefined) {
      payload = { ...{}, ...(this as Record<string, any>) } as Model;

      const keys = Object.keys(payload);

      keys.forEach((property) => {
        if (!this.isFillable(property)) {
          delete payload[property];
        }
      });
    } else {
      payload = attributes;
    }

    return payload;
  }

  public request(
    method: string,
    url: string,
    payload: any = {},
    fileType = 'json',
    headers: {[key: string]: string} = {},
  ): Promise<any> {
    if (this.$includes.length) {
      let queryPath = '';
      this.$includes.forEach((include: string) => {
        const query = `with[]=${include}`;
        queryPath +=  !queryPath ? `?${query}` : `&${query}`;
      });
      url = `${url}${queryPath}`;
    }

    if (this.$admin) {
      payload.admin = true;
    }

    const keys = Object.keys(this.filters);
    if (keys.length) {
      keys.forEach((key) => {
        const model: Model = (this.filters as any)[key];
        if (isObject(model) && typeof model.resolvePrimaryKey === 'function') {
          (this.filters as any)[key] = model.resolvePrimaryKey();
        }
      });

      payload.filter = this.filters;
    }

    if (this.$page !== null) {
      payload.page = this.$page;
    }

    if (this.$limit !== null) {
      payload.limit = this.$limit;
    }

    if (this.$sort.key) {
      payload.sort = this.$sort.order === 'DESC' ? `!${this.$sort.key}` : this.$sort.key;
    }

    return apiClient(method, url, payload, headers).then(
      (response: object) => Promise.resolve(
        fileType === 'json' ? this.responseToModel(response) : this.responseToString(response),
      ),
      (error: AxiosError) => {
        if (error.response !== undefined && error.response.status === 401) {
          const authModule = getModule(Auth);
          authModule.userDeauthenticated('');
        }

        // if (error?.response?.status === 422) {
        //   openDialog({
        //     type: 'error',
        //     text: this.parseError(error.response.data.errors),
        //   });
        // }

        return Promise.reject(error);
      },
    );
  }

  protected parseError(errors: {[key: string]: string[]}): string {
    const flatErrors: string[] = [];
    Object.keys(errors).forEach((key: string) => {
      errors[key].forEach((error: string) => {
        flatErrors.push(error);
      });
    });

    return flatErrors.join('<br>');
  }

  public include(includes: string | string[]) {
    if (typeof includes === 'string') {
      includes = [includes];
    }

    this.$includes = includes;

    return this;
  }

  public removeFilter(key: string) {
    if ((this.filters as any)[key]) {
      delete (this.filters as any)[key];
    }

    return this;
  }

  public filter(filters: string | object, value?: any) {
    if (typeof filters === 'string') {
      const key = filters;
      filters = {};
      (filters as any)[key] = value || null;
    }

    this.filters = { ...this.filters, ...filters };

    return this;
  }

  /**
   * clears the API response of all properties never required by the front end.
   * These are the with '$' prefixed properties
   *
   * @memberof Model
   */
  public cleanupAPIResponse(response: Model) {
    const cleaned = {};
    for (const key in response) {
      if (key[0] !== '$') {
        (cleaned as any)[key] = (response as any)[key];
      }
    }
    return cleaned;
  }

  public page(page: number) {
    this.$page = page;

    return this;
  }

  public limit(limit: number) {
    this.$limit = limit;
    return this;
  }

  public isFillable(key: string): boolean {
    return this.$fillable.includes(key);
  }

  public sort(key: string, order: SortOrder = 'ASC') {
    this.$sort = { key, order };

    return this;
  }

  public clearSort() {
    this.$sort = {};

    return this;
  }

  public clone() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }

  public dataToModel(
    data: any,
    className: string,
    rows: boolean | Array<Record<string, any>> = false,
  ): any {
    if (rows && Array.isArray(rows)) {
      const meta = {
        current_page: data.current_page || 1,
        first_page: data.from || 1,
        last_page: data.last_page || 1,
        total: data.total || 1,
      };

      rows.forEach((row: any, i: any) => {
        (rows as any)[i] = this.rowToModel(row, className);
        const currentMeta = (rows as any)[i].meta !== undefined
          && typeof (rows as any)[i].meta === 'object'
          ? (rows as any)[i].meta
          : {};
        (rows as any)[i].meta = { ...meta, ...currentMeta };
      });

      return rows;
    }

    return this.rowToModel(data, className);
  }

  public responseToModel(response: any): any {
    const paginatedResults = response.data.data !== undefined && Array.isArray(response.data.data);
    const { data } = response;
    const rows = paginatedResults ? response.data.data : false;
    const className = this.getInstanceName();
    return this.dataToModel(data, className, rows);
  }

  public responseToString(response: any): string {
    return response.data ? response.data : '';
  }

  public rowToModel(
    row: object,
    modelClass: string,
    includes: any = [],
  ): Model {
    const attributes = row;

    const model = InstanceLoader.get(modelClass, attributes);

    Object.keys(model).forEach((key) => {
      const setterMethod = `set${studlyCase(key)}Attribute`;
      /* eslint-disable-next-line */
      if (model.__proto__.hasOwnProperty(setterMethod)) {
        model[key] = model[setterMethod](model[key]);
      }
    });

    return model;
  }

  private isNullOrUndefined(value: any) {
    return isNull(value) || isUndefined(value);
  }
}

export interface AutocompleteItem {
  value: string;
  text: string;
  name: string;
}

export interface SortOptions {
  key?: string;
  order?: SortOrder;
}

export type SortOrder = 'ASC' | 'DESC';

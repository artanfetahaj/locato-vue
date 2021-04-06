import { Location } from '@/models/Location';

import { Model } from '@/models/Model';

export class User extends Model {
  protected $name = 'User';

  protected $endpoint = '/users';

  protected $primaryKey = 'id';

  protected $fillable: string[] = [
    'email',
    'first_name',
    'last_name',
    'phone',
    'last_name',
  ];

  public id?: string;

  public uuid?: string;

  public email?: string;

  public first_name?: string;

  public last_name?: string;
  
  public phone?: string;

  public password?: string;

  public avatar?: any;

  public saved_locations?: Location[];

  public me(): Promise<this> {
    return this.request('get', '/user', {}, '');
  }

  public getUserUpdatePayload(): UpdateUserPayload {
    return {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      avatar: this.avatar,
    }
  }
}

export interface UpdateUserPayload {
  first_name?: string;
  last_name?: string;
  email?: string,
  avatar?: string,
}
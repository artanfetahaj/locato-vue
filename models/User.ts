import { Location } from '@/models/Location';

import { Model } from '@/models/Model';

export class User extends Model {
  protected $name = 'User';

  protected $endpoint = '/users';

  protected $primaryKey = 'id';

  protected $fillable = [
    'email',
    'first_name',
    'last_name',
    'phone',
    'last_name',
  ];

  public id?: string;

  public email?: string;

  public first_name?: string;

  public infix_name?: string;

  public last_name?: string;
  
  public phone?: string;

  public password?: string;

  public avatar?: any;

  public saved_locations?: Location[];

  public me(): Promise<this> {
    return this.request('get', '/user', {}, '');
  }
}

export interface UpdateUserPayload {
  first_name?: string;
  last_name?: string;
  email?: string,
  avatar?: string,
}
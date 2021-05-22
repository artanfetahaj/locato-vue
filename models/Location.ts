
import { Model } from '@/models/Model';
import { User } from '@/models/User';

export class Location extends Model {
  protected $name = 'Location';

  protected $endpoint = '/locations';

  protected $primaryKey = 'id';

  protected $fillable = [
    'title',
    'description'
  ];

  public id?: string;

  public title?: string;

  public description?: string;

  public user?: User;
}

export interface updatePayload {
  title?: string;
  description?: string;
}

export interface createPayload {
  user: string,
  title?: string;
  description?: string;
  images?: string[];
  capacity?: number;
  price_per_hour?: number;
  min_rent_time_hours?: number;
}

export interface locationImagePayload {
  file?: File;
  order?: number;
}
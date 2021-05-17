
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
  daypart_rent_only?: boolean;
  price_per_hour?: string;
  price_per_daypart?: string;
  capacity?: number;
}

export interface locationImagePayload {
  file?: File;
  order?: number;
}
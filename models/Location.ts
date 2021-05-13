
import { Model } from '@/models/Model';

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
}

export interface updatePayload {
  title?: string;
  description?: string;
}

export interface createPayload {
  user_id: string,
  title?: string;
  description?: string;
  images?: string[];
  daypart_rent_only?: boolean;
  price_per_hour?: string;
  price_per_daypart?: string;
  max_participants?: number;
}

export interface locationImagePayload {
  file?: File;
  order?: number;
}
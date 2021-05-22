
import { Model } from '@/models/Model';
import { User } from '@/models/User';
import { Location } from '@/models/Location';

export class Booking extends Model {
  protected $name = 'Booking';

  protected $endpoint = '/bookings';

  protected $primaryKey = 'id';

  protected $fillable = [
    'location',
    'applicant',
    'host',
    'title',
    'start_time',
    'end_time'
  ];

  public id!: string;

  public title?: string;

  public location?: Location;

  public host?: User;

  public applicant?: User;

  public start_time?: string;

  public end_time?: string;
}

export interface createPayload {
  title?: string;
  location?: string;
  host?: string;
  applicant?: string;
  start_time?: string;
  end_time?: string;
}
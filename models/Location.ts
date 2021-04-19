
import { Model } from '@/models/Model';

export class Location extends Model {
  protected $name = 'Location';

  protected $endpoint = '/locations';

  protected $primaryKey = 'id';

  protected $fillable: string[] = [];

  public id?: string;

  public uuid?: string;

  public title?: string;
}

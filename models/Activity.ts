import { Model } from '@/models/Model.ts';

export class Activity extends Model {
  protected $name = 'Activity';

  protected $endpoint = '/activities';

  protected $primaryKey = 'id';

  protected $fillable: string[] = [];

  public id?: string;

  public name?: string;

  public list() {
    return this.request('get', this.$endpoint, {}, '');
  }
}

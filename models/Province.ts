import { Model } from '@/models/Model.ts';

export class Province extends Model {
  protected $name = 'Province';

  protected $endpoint = '/provinces';

  protected $primaryKey = 'id';

  protected $fillable: string[] = [];

  public id?: string;

  public name?: string;

  public list() {
    return this.request('get', this.$endpoint, {}, '');
  }
}

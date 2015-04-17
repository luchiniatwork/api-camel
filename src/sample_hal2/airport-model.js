import BaseModel from '../lib/base-model';

export default class Airport extends BaseModel {
  
  smallCode() {
    return this.get('code').toLowerCase();
  }
  
}
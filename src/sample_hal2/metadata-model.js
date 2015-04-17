import BaseModel from '../lib/base-model';

export default class Metadata extends BaseModel {
  
  isServiceOperational(service) {
    return this.get('services')[service] === 'OPERATIONAL';
  }
}
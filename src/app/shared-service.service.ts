import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  publicStore = { a: { value: 'a-value' }, b: { value: 'b-value' } };

  constructor() { }

  getValue(id: string): string {
    return this.publicStore[id].value;
  }
}

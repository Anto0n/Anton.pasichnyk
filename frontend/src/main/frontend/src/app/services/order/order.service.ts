import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class OrderService {

  // Observable string sources
  private orderCreateSource = new Subject<string>();

// Observable order streams

  // Service message commands
//https://angular.io/docs/ts/latest/cookbook/component-communication.html#!#parent-to-child-on-changes
  constructor() { }

}

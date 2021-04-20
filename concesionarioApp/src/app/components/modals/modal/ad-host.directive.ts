import { ViewContainerRef } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
  selector: 'ng-template[adHost]'
})
export class AdHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}

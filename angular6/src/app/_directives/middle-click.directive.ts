import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({ selector: '[pxMiddleClick]' })
export class MiddleClickDirective  {
  @Output() pxMiddleClick = new EventEmitter() ;

  constructor() {}

  @HostListener('mouseup', ['$event'])
  middleclickEvent(event) {
    if (event.which === 2) {
      this.pxMiddleClick.emit(event);
    }
  }
}

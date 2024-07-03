import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @Input() appHighlight = '';

  constructor(private el: ElementRef) {
    // this.el.nativeElement.style.color = 'red';
  }

  @HostListener('mouseenter') enter() {
    this.el.nativeElement.style.color = this.appHighlight;
  }

  @HostListener('mouseleave') leave() {
    this.el.nativeElement.style.color = '';
  }
}

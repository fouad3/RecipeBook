import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';


@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  // solution of the video :
  // @HostBinding('class.open') isOpen = false;
  // @HostListener('click') toggleOpen() {
  //   this.isOpen = !this.isOpen;
  // }
  value = true;
  constructor (private renderer: Renderer2 , private el: ElementRef) {}
  @HostListener('click') toggle() {
      if (this.value) {
        this.renderer.addClass(this.el.nativeElement, 'open');

      } else {
        this.renderer.removeClass(this.el.nativeElement, 'open');
      }
     this.value = !this.value;
}



}

import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {
  @Input() customImg: string = '';
  @HostListener('error') handleError (): void{   
    const elNative = this.elHost.nativeElement    
    console.log('Esta imagen revento' + this.elHost + '   custom_img = ' + this.customImg)
    if (this.customImg != ''){
      elNative.src = this.customImg;
      console.log('Abriendo imagena alterna: ' + this.customImg);
    }else{      
      elNative.src = '../../../assets/images/noimagen.jpg';
    }

  }

  constructor(private elHost: ElementRef) { 
    
  }


}

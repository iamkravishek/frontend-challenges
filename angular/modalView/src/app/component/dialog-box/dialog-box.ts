import { Component, ElementRef, HostBinding, ViewChild } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-dialog-box',
  imports: [],
  templateUrl: './dialog-box.html',
  styleUrl: './dialog-box.css',
})
export class DialogBox {
  @ViewChild('dialogBox') private Dialog !: ElementRef<HTMLDialogElement>;
  @HostBinding('style.--background') background = '#f7b516';

  public open():void{
    this.Dialog.nativeElement.showModal();
  }

  public close():void{
    this.Dialog.nativeElement.close();
  }

  public onDialogClick(event:MouseEvent){
    const dialogElement = this.Dialog.nativeElement as HTMLElement;
    const rect = dialogElement.getBoundingClientRect();

    // Check if the click coordinates fall outside the modal content box boundaries
    const clickedOutside = 
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (clickedOutside) {
      this.Dialog.nativeElement.close();
    }

     //It will close the target if clicked anywher on wrapper thus taking getBoundingClientRect();
    // if(event.currentTarget === dialogElement){
    //   this.Dialog.nativeElement.close();
    // }
  }

}

import { Component, ViewChild } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { DialogBox } from "./component/dialog-box/dialog-box";

@Component({
  selector: 'app-root',
  imports: [ DialogBox],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'modalView';

  @ViewChild('dialog') DialogBox !: DialogBox;

  openDialog(){
    this.DialogBox.open();
  }
}

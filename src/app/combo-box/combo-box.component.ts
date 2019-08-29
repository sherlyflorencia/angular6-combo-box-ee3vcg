import {Component, Input, OnInit} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {FormsModule} from '@angular/forms'
import { ComboBoxPipe } from './combo-box.pipe';

export enum KEY_CODE {
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  TAB_KEY = 9
}
@Component({
  selector: 'combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.css'],
  providers: [ComboBoxPipe]
})
export class ComboBoxComponent implements OnInit {

  @Input()
  dataList: [];
  
  @Input()
  columnName: String;
  
  dummyDataList: [];
  showDropDown: boolean;
  counter:number;

  onFocusEventAction():void {
    this.counter = -1;
  }
  
  onBlurEventAction(): void{
    //if(this.counter > -1)this.textToSort = this.dataList[this.counter][this.columnName];
    this.showDropDown = false; 
  }
  
  onKeyDownAction(event: KeyboardEvent):void {
    // console.log('event.keyCode',event.keyCode);   
    this.showDropDown = true;
    if (event.keyCode === KEY_CODE.UP_ARROW) {
       this.counter = (this.counter === 0)?this.counter:--this.counter;
       this.checkHighlight(this.counter);
       this.textToSort = this.dataList[this.counter][this.columnName];
    }

    if (event.keyCode === KEY_CODE.DOWN_ARROW) {
      this.counter = (this.counter === this.dataList.length-1)?this.counter:++this.counter;
      this.checkHighlight(this.counter);
      this.textToSort = this.dataList[this.counter][this.columnName];  
    }
    // if(event.keyCode === KEY_CODE.TAB_KEY){
    //   this.textToSort = this.dataList[this.counter];
    //   this.showDropDown = false;
    // }
  }
  
  checkHighlight(currentItem):boolean{
      if(this.counter === currentItem) return true;
      else return false;
  }
  
  // onTabButtonAction(event: KeyboardEvent):void{
  //   console.log('event.keyCode',event.keyCode);   
  // }
  
  constructor(private ComboBoxPipe: ComboBoxPipe) {
    this.reset();
  }
   
  ngOnInit(){
    this.reset();
  }
  
  toogleDropDown():void {
    this.showDropDown = !this.showDropDown;
  }
  
  reset(): void{
    this.showDropDown = false;
    this.dummyDataList = this.dataList;
  }
  
  textChange(value){
    this.dummyDataList = [];
    if(value.length >0){
      this.dummyDataList = this.ComboBoxPipe.transform(this.dataList, this.columnName, value);
      // console.log('this.dummyDataList',this.dummyDataList);
      if(this.dummyDataList){this.showDropDown = true;}
    } else {
      this.reset(); 
    }
  }
  
  updateTextBox(valueSelected){
    this.textToSort = valueSelected;
    this.showDropDown = false;
  }
}
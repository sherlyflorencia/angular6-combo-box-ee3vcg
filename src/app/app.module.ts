import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ComboBoxComponent } from './combo-box/combo-box.component';
import { ComboBoxPipe } from './combo-box/combo-box.pipe';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, ComboBoxComponent, ComboBoxPipe ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

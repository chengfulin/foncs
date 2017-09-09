import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { LoadComponent } from './load/load.component';
import { FontsService } from './fonts.service';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    LoadComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [FontsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

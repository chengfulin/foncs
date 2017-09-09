import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ListComponent } from './list/list.component';
import { ColorComponent } from './color/color.component';
import { SizeComponent } from './size/size.component';
import { LoadComponent } from './load/load.component';
import { FontsService } from './fonts.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ListComponent,
    ColorComponent,
    SizeComponent,
    LoadComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [FontsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

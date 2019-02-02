import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SpeakComponent } from './speak/speak.component';

import {RecognitionService} from './recognition.service';

@NgModule({
  declarations: [
    AppComponent,
    SpeakComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [RecognitionService], //Write the name of service classes to enable injection
  bootstrap: [AppComponent]
})
export class AppModule { }

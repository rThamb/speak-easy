import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SpeakComponent } from './speak/speak.component';

import {RecognitionService} from './recognition.service';
import {TranslateService} from './translate.service';
import {LangConfigService} from './lang-config.service';



@NgModule({
  declarations: [
    AppComponent,
    SpeakComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [RecognitionService, TranslateService, LangConfigService], //Write the name of service classes to enable injection
  bootstrap: [AppComponent]
})
export class AppModule { }

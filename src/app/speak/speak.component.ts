import { Component, OnInit, OnDestroy } from '@angular/core';
import {RecognitionService} from '../recognition.service';
import {TranslateService} from '../translate.service'; 

@Component({
  selector: 'app-speak',
  templateUrl: './speak.component.html',
  styleUrls: ['./speak.component.css']
})
export class SpeakComponent implements OnInit, OnDestroy {

  service: RecognitionService;
  translateService: TranslateService; 
  
  speechData: string;

  langSpoken: string; 
  langTranslated: string; 

  //Angular will inject the custom service, make sure to register app in app.module.ts (providers)
  //ng generate service {serviceName} - to generate a new service
  constructor(private sttService: RecognitionService, private tService: TranslateService) {
    this.service = sttService;
    this.translateService = tService; 
  }

  ngOnInit() {
    this.speechData = "";
    this.langSpoken = ""; 
    this.langTranslated = ""; 
  }

  ngOnDestroy() {
    this.service.DestroySpeechObject();
  }

  listen(){
    this.activateSpeechSearchMovie();
  }


  activateSpeechSearchMovie(): void {
        this.service.listen()
            .subscribe(
            //listener
            (value) => {
                this.speechData = value;
                this.translateSpeech();
                console.log(value);
            },
            //errror
            (err) => {
                console.log(err);
                if (err.error == "no-speech") {
                    console.log("--restatring service--");
                    this.activateSpeechSearchMovie();
                }
            },
            //completion
            () => {
                console.log("--complete--");
            });
    }

    translateSpeech(){
        //use translate service
        this.translateService.translate(this.speechData, "fr", this.speakTranslateContent, this.service); 
    }

    speakTranslateContent(content, service){       
        var langCode = "fr-FR";
        var voiceUrl = "Google français";
        service.speak(content.text[0], langCode, voiceUrl);
    }

}

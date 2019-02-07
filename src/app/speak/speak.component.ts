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

  //for voice reg.
  langListener: string; 
  voiceURL: string; 

  //for api
  apiLangCode: string; 

  //Angular will inject the custom service, make sure to register app in app.module.ts (providers)
  //ng generate service {serviceName} - to generate a new service
  constructor(private sttService: RecognitionService, private tService: TranslateService) {
    this.service = sttService;
    this.translateService = tService; 
  }

  ngOnInit() {
    this.speechData = "";
    this.langSpoken = ""; 
  }

  ngOnDestroy() {
    this.service.DestroySpeechObject();
  }

  translateEnglish(){
      this.langSpoken = "en-us";
      this.apiLangCode = 'fr';
      this.langListener = "fr-FR";
      this.voiceURL = "Google français";

      this.listen(this.langSpoken);
  }

  translateSpeaker(){

      this.langSpoken = "fr-FR";
      this.apiLangCode = 'en';
      this.langListener = "en-US";
      this.voiceURL = "Google US English";

      this.listen(this.langSpoken); 
  }



  listen(lang){
    this.activateSpeechSearchMovie(lang);
  }


  activateSpeechSearchMovie(lang): void {
        this.service.listen(lang)
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
                    this.activateSpeechSearchMovie(lang);
                }
            },
            //completion
            () => {
                console.log("--complete--");
            });
    }

    translateSpeech(){
        //use translate service
        this.translateService.translate(this.speechData, this.apiLangCode, this.speakTranslateContent, this.service, this.langListener, this.voiceURL); 
    }

    speakTranslateContent(content, service, langListener, voiceURL){       
        
        var langCode = langListener
        var voiceUrl = voiceURL;
        service.speak(content.text[0], langCode, voiceUrl);
    }

}

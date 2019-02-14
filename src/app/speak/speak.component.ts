import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import {RecognitionService} from '../recognition.service';
import {TranslateService} from '../translate.service'; 
import {LangConfigService} from '../lang-config.service';
import {ChatboxComponent} from '../chatbox/chatbox.component'; 

@Component({
  selector: 'app-speak',
  templateUrl: './speak.component.html',
  styleUrls: ['./speak.component.css']
})
export class SpeakComponent implements OnInit, OnDestroy {

  //@Input() chatbox: ChatboxComponent;
  
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  @Output() clearBox: EventEmitter<any> = new EventEmitter();

  service: RecognitionService;
  translateService: TranslateService; 
  configService: LangConfigService;
  
  speechData: string;

  langSpoken: string; 

  //for voice reg.
  langListener: string; 
  voiceURL: string; 

  //for api
  apiLangCode: string; 

  //button state
  active: boolean; 
  button: Element; 


  //Angular will inject the custom service, make sure to register app in app.module.ts (providers)
  //ng generate service {serviceName} - to generate a new service
  constructor(private sttService: RecognitionService, private tService: TranslateService,
              private langConService: LangConfigService) {
    this.service = sttService;
    this.translateService = tService; 
    this.configService = langConService;
  }

  ngOnInit() {
    this.speechData = "";
    this.langSpoken = ""; 
  }

  ngOnDestroy() {
    this.service.DestroySpeechObject();
  }


  onLangChange(){
      this.clearBox.emit("");
  }

  translateEnglish(){

    this.active = true;
    this.button = document.getElementById("speakBtn");
    this.toggleButton();

    var config = this.configService.getSpeakerConfiguration(this.getLangCode());

      this.langSpoken = config.langSpoken;
      this.apiLangCode = config.apiLangCode;
      this.langListener = config.langListener;
      this.voiceURL = config.voiceURL;

      this.listen(this.langSpoken);
  }

  translateSpeaker(){

      this.active = true;
      this.button = document.getElementById("listenBtn");
      this.toggleButton();

      var config = this.configService.getListenConfiguration(this.getLangCode());
      this.langSpoken = config.langSpoken;
      this.apiLangCode = config.apiLangCode;
      this.langListener = config.langListener;
      this.voiceURL = config.voiceURL;

      this.listen(this.langSpoken); 
  }


  getLangCode(){
        let element: HTMLInputElement = (<HTMLInputElement>document.getElementById("lang"));
        return element.value;
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
                this.active = false; 
                this.toggleButton();
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
        this.translateService.translate(this.speechData, this.apiLangCode, this.speakTranslateContent, this.service, this.langListener, this.voiceURL, this.notifyParent); 
    }

    speakTranslateContent(original, content, service, langListener, voiceURL, notifyParent){       
        
        var langCode = langListener
        var voiceUrl = voiceURL;
        var message = "";
        
        if(langCode != 'en-US')
            message = original + " - " + content.text[0];
        else
            message = content.text[0] + " - " + original;

        notifyParent.emit(message + "|" + langCode); 
        service.speak(content.text[0], langCode, voiceUrl);        
    }

    toggleButton(){

        debugger;
        if(this.active)
            this.button.className = "stop";
        else
            this.button.className = "speak";
    }
}

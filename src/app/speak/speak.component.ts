import { Component, OnInit, OnDestroy } from '@angular/core';
import {RecognitionService} from '../recognition.service';

@Component({
  selector: 'app-speak',
  templateUrl: './speak.component.html',
  styleUrls: ['./speak.component.css']
})
export class SpeakComponent implements OnInit, OnDestroy {

  service: RecognitionService;
  
  speechData: string;

  langSpoken: string; 
  langTranslated: string; 

  //Angular will inject the custom service, make sure to register app in app.module.ts (providers)
  //ng generate service {serviceName} - to generate a new service
  constructor(private sttService: RecognitionService) {
    this.service = sttService;
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
                alert(value);
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
                this.activateSpeechSearchMovie();
            });
    }

    translateSpeech(speechData){
        //use translate service
    }

}

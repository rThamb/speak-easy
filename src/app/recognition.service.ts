import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import * as _ from "lodash";
import vocabulator from 'vocabulator';

interface IWindow extends Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
}


//Reference: https://hassantariqblog.wordpress.com/2016/12/04/angular2-web-speech-api-speech-recognition-in-angular2/

@Injectable({
  providedIn: 'root'
})
export class RecognitionService {

  speechRecognition: any;

  constructor(private zone: NgZone) { }

  //pass the language the speaker is talking in. 
  listen(): Observable<string> {

        return Observable.create(observer => {
            const { webkitSpeechRecognition }: IWindow = <IWindow>window;
            this.speechRecognition = new webkitSpeechRecognition();
            //this.speechRecognition = SpeechRecognition;
            this.speechRecognition.continuous = true;
            //this.speechRecognition.interimResults = true;
            this.speechRecognition.lang = 'en-us';
            this.speechRecognition.maxAlternatives = 1;

            this.speechRecognition.onresult = speech => {
                let term: string = "";
                if (speech.results) {
                    var result = speech.results[speech.resultIndex];
                    var transcript = result[0].transcript;
                    if (result.isFinal) {
                        if (result[0].confidence < 0.3) {
                            console.log("Unrecognized result - Please try again");
                        }
                        else {
                            term = _.trim(transcript);
                            console.log("You said: -> " + term);
                        }
                    }
                    
                }
                
                this.zone.run(() => {
                  this.DestroySpeechObject();
                   observer.next(term);
                });       
            };

            this.speechRecognition.onerror = error => {
                observer.error(error);
            };

            this.speechRecognition.onend = () => {
                observer.complete();
            };

            this.speechRecognition.start();
            console.log("Say something - We are listening !!!");
        });
    }

    speak(speeechContent, language, voiceName){

        //pass in language

        //speeechContent = 'Hello, world!';
        //language =  'en-GB';
        //voiceName = "Google UK English Male";      

        const synthesizer = vocabulator({
            language: language,
            voiceName: voiceName,
            pitch: 1
        });
 
        synthesizer.say({ text: speeechContent, /* language, voiceName, pitch, ... */  })
    }


  DestroySpeechObject() {
      if (this.speechRecognition)
            this.speechRecognition.stop();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  httpClient: HttpClient; 

  constructor(private http: HttpClient) { 
    this.httpClient = http;
  }

  translate(speechText, langCode){
    

    //url encode the speechText

    var url = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190126T192238Z.c140108de3070d92.38f3f7a9f7437e3d249acd0da01d131e133673a9&text=" + speechText + "&lang=" + langCode;
    var observable = this.httpClient.get(url);

    observable.subscribe( (response) => console.log(response.text[0]));

    return "Here is the translated content: " + speechText;
  }
}

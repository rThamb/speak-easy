import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LangConfigService {

  constructor() { }


  getSpeakerConfiguration(langCode){

    let configuration: LangConfig; 

    switch(langCode){
      case "fr": {     
         configuration = new LangConfig("en-us", "fr", "fr-FR", "Google français");
         break; 
      } 
        
      case "es": { 
         configuration = new LangConfig("en-us", "es", "es-ES", "Google español"); 
         break; 
      }
        
      case "zh": { 
         configuration = new LangConfig("en-us", "zh", "zh-CN", "Google 普通话（中国大陆）"); 
         break; 
      } 
    }
  
    return configuration; 
  }

  getListenConfiguration(langCode){
    
    let configuration: LangConfig; 

    switch(langCode){
      case "fr": {   
         configuration = new LangConfig("fr-FR", "en", "en-US", "Google US English");
         break; 
      } 
        
      case "es": { 
         configuration = new LangConfig("es-ES", "en", "en-US", "Google US English"); 
         break; 
      }
      case "zh": { 
         configuration = new LangConfig("zh-CN", "en", "en-US", "Google US English"); 
         break; 
      } 
    }
  
    return configuration; 

  }
}



class LangConfig {

    langSpoken: string; 
    apiLangCode: string; 
    langListener: string; 
    voiceURL: string; 

    constructor(langSpoke: string, apiLang: string, langListen: string, voice: string) {
      this.langSpoken = langSpoke;
      this.apiLangCode = apiLang;
      this.langListener = langListen;
      this.voiceURL = voice;
    }
}

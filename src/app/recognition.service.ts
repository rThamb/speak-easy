import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecognitionService {

  constructor() { }

  getData(){
    return "Hello World"; 
  }
}

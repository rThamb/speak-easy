import { Component, OnInit } from '@angular/core';
import {RecognitionService} from '../recognition.service';

@Component({
  selector: 'app-speak',
  templateUrl: './speak.component.html',
  styleUrls: ['./speak.component.css']
})
export class SpeakComponent implements OnInit {

  service: RecognitionService;
  message = ""; 

  //Angular will inject the custom service, make sure to register app in app.module.ts (providers)
  constructor(private sttService: RecognitionService) {


    this.service = sttService;
  }

  ngOnInit() {
    this.message = this.service.getData();
  }

  listen(){
    alert("Test");
  }
}

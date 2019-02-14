import { Component, OnInit, ViewChild, ElementRef, HostBinding  } from '@angular/core';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {


  constructor() {}

  ngOnInit() {

  }

  getChatbox(){
    return document.getElementById('message_board');
  }

  getDialogHTML(message, englishSpeaker){
    let side = (englishSpeaker)? "right" : "left";
    return "<li _ngcontent-c1='' class='message " + side + " appeared'> <div _ngcontent-c1='' class='avatar'></div> <div _ngcontent-c1='' class='text_wrapper'> <div _ngcontent-c1='' class='text'> "+ message + " </div> </div> </li>";
  }

  displayMyMessage(message){
    let ele = this.getChatbox();
    let content = message.split("|");
    let html = this.getDialogHTML(content[0], content[1] != "en-US");
    ele.insertAdjacentHTML('beforeend', html);
  }

  clearChatBox(event){
      
      let ele = this.getChatbox();
      while (ele.firstChild) {
        ele.removeChild(ele.firstChild);
      }
  }
}

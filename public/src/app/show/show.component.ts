import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';
import * as io from 'socket.io-client';
import * as $ from 'jquery';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  viewMentor = { name: '' };
  newRating;
  actualname = ""
  message = {message: ""}
  display = ""
  usernameInput = false;
  socket: SocketIOClient.Socket;
  constructor(private _route: ActivatedRoute,
    private _httpService: HttpService,
    private _router: Router,
  ) { 
    this.socket = io('http://localhost:8000');
  }

  ngOnInit() {
    this.display = "";
    this.newRating = { stars: "", name: " ", reviews: "", id: "" };
    this.findMentor()
    this._httpService.scrollTo("person");
    this.socket.emit("clientConnected");
    this.socket.on("updateMessage", function(data){
      this.display = data.toString();
      $('#chatbox').html(this.display);
    })
  }
  setName() {
    this.actualname = $('#username').val();
    this.usernameInput = true;
  }
  sendMessage() {
    let message = ""
    message += this.actualname + " says : " + this.message.message
    this.socket.emit("messageFromClient", message);
    this.message.message = ""
  }
  findMentor() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['id']);
      console.log("finding a mentor");
      let observable = this._httpService.findOneMentor(params["id"]);
      observable.subscribe(data => {
        console.log(data)
        this.viewMentor = data['data']
        console.log("details data", this.viewMentor)

      })
    })
  }
  // addRating(id, thisstars, thisreviews, thisname) {
  //   this.newRating.id = id;
  //   this.newRating.stars = thisstars.value;
  //   this.newRating.name = thisname.value;
  //   this.newRating.reviews = thisreviews.value;
  //   console.log("my rATING", this.newRating)
  //   let myRating = this._httpService.createRating(this.newRating, id);
  //   myRating.subscribe(data => {
  //     this.findMentor();
  //     this.newRating = { stars: "", name: " ", reviews: "" };
  //   });
  // }

  addRating(id){
    let observable = this._httpService.createRating(this.newRating, id);
    observable.subscribe(data => {
      console.log("creating rating", data)
      this.findMentor();
      this.newRating = {stars: "", name:" ",reviews: ""};

      // this.newMentor={name: " ", url: " ",description:"",skills:[""]};
      // this._httpService.scrollTo("services");
    });
  }

  // connectToServer() {
  //   this.socket.emit('message', {msg: this.message});
  //   this.socket.fromEvent('new-message').subscribe((data) => {
  //     this.messages.push(data['msg']);
  //   });
  // }
  // sendMessage() {
  //   this.socket.emit('saveMsg', {msg : {user : this.message, message: this.message}});
  // }

}

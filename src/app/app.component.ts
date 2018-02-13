import {OnInit, Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit() {
     firebase.initializeApp({
      apiKey: 'AIzaSyBiX7-mczcfXNSqyf8l6EGqhizY1ShWcKs',
      authDomain: 'ng-recipe-book-77d1d.firebaseapp.com',
     });
  }
}

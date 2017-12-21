import { Component, ViewChild, ElementRef } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
// import { throw } from 'rxjs/observable/throw';
import { Subscriber } from './subscriber';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  monTexte = '';
  
  public ngOnInit() {
      const source$ = new Observable(observer => {
      console.log('Creating Observable...');
      
      setTimeout(() => {
        observer.next('Hello World');
        observer.complete();
      }, 3000);

      
      observer.next('A Value');
      observer.next('Another Value');

      // observer.error(new Error('Erreur 42'));

      observer.next('Vous ne passerez pas ;)');

    }).subscribe( Subscriber.create('myobs') );

  }

}

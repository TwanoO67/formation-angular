import { Component, ViewChild, ElementRef } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/connect';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { interval } from 'rxjs/observable/interval';
// import { throw } from 'rxjs/observable/throw';
import { Subscriber } from './subscriber';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  monTexte = '';

  source1$ = interval(1000).publish();

  source2$ = new Observable(observer => {
    observer.next(Date.now());
  }).publish().connect();


  source3$ = Rx.Observable
					.interval(1000)
					.publish()
					.refCount();
  
  public ngOnInit() {

    this.source1$.subscribe(Subscriber.create('one'));
    this.source2$.subscribe(Subscriber.create('two'));

    setTimeout(() => {
      console.log(source$);
      this.source1$.subscribe(Subscriber.create("three"));
      this.source1$.connect();
      setTimeout(() => {
        this.source2$.subscribe(Subscriber.create("four"));
        this.source2$.connect();
      }, 4000);
    },2000);


    setTimeout(() => {
      this.source3$.subscribe(Subscriber.create("five"));
      setTimeout(() => {
        this.source3$.subscribe(Subscriber.create("six"));
      }, 4000);
    },2000);


  }

}

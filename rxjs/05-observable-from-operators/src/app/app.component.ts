import { Component, ViewChild, ElementRef } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';
import { range } from 'rxjs/observable/range';
import { interval } from 'rxjs/observable/interval';
import { timer } from 'rxjs/observable/timer';
import { Subscriber } from './subscriber';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  monTexte = '';

  public ngOnInit() {

    //EX 1
    const source1$ = timer(3000, 100)
    .publish();

    source1$
      .take(10)
      .subscribe(Subscriber.create('one'));

    source1$
      .skip(10)
      .take(10)
      .subscribe(Subscriber.create('two'));

    source1$
      .connect();

    //EX 2
   const source2$ = interval(100)
	  .take(10)
	  .subscribe(Subscriber.create('interval'));

    //EX 3
    const source3$ = range(0, 5)
      .subscribe(Subscriber.create('range'));

    const source4$ = of(45, 'Hello', [2,3,5,6])
      .subscribe(Subscriber.create('of'));

    //EX4
    let i = 0;
    const source5$ = defer( () => {
      i++;
      return of(i);
    });
    source5$.subscribe(Subscriber.create('one'));
    source5$.subscribe(Subscriber.create('two'));
    source5$.subscribe(Subscriber.create('three'));


  }

}

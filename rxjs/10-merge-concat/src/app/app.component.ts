import { Component, ViewChild, ElementRef } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/filter';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';
import { range } from 'rxjs/observable/range';
import { interval } from 'rxjs/observable/interval';
import { merge } from 'rxjs/observable/merge';
import { concat } from 'rxjs/observable/concat';
import { timer } from 'rxjs/observable/timer';
import { Subscriber } from './subscriber';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('txtinput') input;

  public ngOnInit() {

    
    of("Hello")
    .merge(of("World"))
    .subscribe(Subscriber.create("merge"));
    
    interval(2000)
    .merge(interval(500))
    .take(25)
    .subscribe(Subscriber.create("merge"));
      
    let source1$ = interval(2000).map(i => "M1: "+i);
    let source2$ = interval(500).map(i => "M2: "+i);
    
    merge(
      source1$,
      source2$
    )
    .take(25)
    .subscribe(Subscriber.create("merge"));

    //envoi moi 3 nombre
    range(0,3)
    // pour chaque nombre, crée un observable de 3 nombre
    .map((x)=>{
      return range(0,3);
    })
    // remet les dans un seul observable
    .mergeAll()
    .subscribe(Subscriber.create("mergeAll"));

    let source3$ = from([33,45,32,22]);
    let source4$ = from([33,45,63,15]);
    concat(source3$, source4$)
    .subscribe(Subscriber.create("concat"));
    
    let source5$ = range(1,5).map(i => 'Source 5: '+ i);
    let source6$ = range(6,5).map(i => 'Source 6: '+ i);
    concat(source5$, source6$)
	  .subscribe(Subscriber.create("concatString"));

  }

}

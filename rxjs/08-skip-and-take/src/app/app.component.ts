import { Component, ViewChild, ElementRef } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/operator/skipUntil';
import 'rxjs/add/operator/filter';
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

    // on fais un observable depuis les nombre de 1 a 20
    const source$ = range(1, 20);

    // puis on skip tout jusqua ce que i valent 5
    source$
    .skipWhile(i => i <= 5)
    // et on s'arrete quand i vaut plus que 10
    .takeWhile(i => i < 10)
    .subscribe(Subscriber.create("skipWhile"));

    // on prend une valeur toute les 0,5 sec
    interval(500)
    // on skip tout jusqua avoir eu le resultat d'un timer à 2sec
    .skipUntil(timer(2000))
    // puis on s'arrete quand on a eu le resultat d'un time à 7sec
    .takeUntil(timer(7000))
    .subscribe(Subscriber.create("skipUntil"));

    // on fais un observable depuis les nombre de 1 a 10
    range(0, 10)
    // mais on garde que ceux supérieur a 5
    .filter((value, index) => {
        return value >= 5;
    })
    .subscribe(Subscriber.create("filter"));

    // on fais un observable depuis les nombre de 1 a 10
    range(0, 10)
    //puis on garde que les paires
    .filter((value, index) => {
        return value % 2 == 0;
    })
    .subscribe(Subscriber.create("filter"));



  }

}

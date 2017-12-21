import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { fromPromise } from 'rxjs/observable/fromPromise';
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
  user;

  constructor(private _http: HttpClient){

  }

  @ViewChild('txtinput') input;

  public ngOnInit() {

    // A comparer avec la longueur de l'exercice 06 :)

    fromEvent(this.input.nativeElement, 'keyup')
    // on ne prend une recherche qu'une fois pas seconde
    .map((e:Event) => (e.target as HTMLInputElement).value )
    // on ne prend une recherche qu'une fois pas seconde
    .debounceTime(1000)
    // on transforme un flux d'observable, en flux de données
    .switchMap((v) => {
      return this.getGithubUser(v);
    })
    .subscribe(user => {
      this.user = user;
    });

  }

  // idem qu'un retour $.ajax de jquery ou autre lib externe qui renverais des promises
  private getGithubUser(username) {
    let url = 'https://api.github.com/users/'+username+'?callback=callback&client_id=d9308aacf8b204d361fd&client_secret=62551cc02cee983fff0bac41baf170eb5a312c1c';
    return this._http.jsonp(url,'callback');
  }

}

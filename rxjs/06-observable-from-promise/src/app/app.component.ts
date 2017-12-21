import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/debounce';
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

  /*
    Example simple

  const myPromise = new Promise((resolve, reject) => {
    console.log('Creating Promise');
    setTimeout(() => {
      console.log('Something');
      resolve('Hello From Promise!');
    }, 2000);
  });
  myPromise.then(x => {
    console.log(x);
  });
  fromPromise(myPromise)
    .subscribe(this.getSubscriber("promise"));
  */

  fromEvent(this.input.nativeElement, 'keyup')
  // on ne prend une recherche qu'une fois pas seconde
    .debounceTime(1000)
  // on ne veut pas faire 2 fois la même requete
    .distinctUntilChanged()
  // on transforme l'evenement keyup en chaine
    .map((e: Event) => {
        return (e.target as HTMLInputElement).value; // Project the text from the input
    })
  // on ne filtre que les chaines suffisament longue
    .filter((text) => {
        return text.length > 2; // Only if the text is longer than 2 characters
    })
  // puis on s'enregistre
    .subscribe(texte => {
      // on fais la recherche
      fromPromise(this.getGithubUser(texte))
        .subscribe(user => {
          console.log(user);
          this.user = user;
        });
    });

  }

  // idem qu'un retour $.ajax de jquery ou autre lib externe qui renverais des promises
  private getGithubUser(username) {
    let url = 'https://api.github.com/users/'+username+'?callback=callback&client_id=d9308aacf8b204d361fd&client_secret=62551cc02cee983fff0bac41baf170eb5a312c1c';

    return this._http
   .jsonp(url,'callback')
    .toPromise();
  }

}

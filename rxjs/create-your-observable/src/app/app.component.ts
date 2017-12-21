import { Component, ViewChild, ElementRef } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { from } from 'rxjs/observable/from';
// import { onErrorResumeNext } from 'rxjs/observable/onerrorresumenext';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  monTexte = '';

  source$ = /*onErrorResumeNext*/ new Observable<string>((observer) => {
    console.log('Creation de l\'observer');

    observer.next('1ere valeur');
    observer.next('2iem valeur');

    // Attention: une fois qu'une erreur est lancé, observer n'est plus dispo
    // observer.error( new Error('Exemple d\'une erreur') );
    // observer.next('valeur jamais reçu');

    // Attend 3 secondes
    setTimeout(() => {
      observer.next('3iem valeur');

      observer.complete();
    }, 3000);
  });


  public ngOnInit() {

    this.source$.subscribe(
      (val) => {
      console.log('valeur recu');
      this.monTexte = val;
    },
    (error) => {
      console.log('attrape une erreur');
    },
    () => {
      console.log('fin de l\observable');
    }
    );

  }

}

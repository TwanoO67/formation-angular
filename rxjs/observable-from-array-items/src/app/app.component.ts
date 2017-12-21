import { Component, ViewChild, ElementRef } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { from } from 'rxjs/observable/from';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  monTexte = '';

  // Depuis un objet
  str = 'Hello Word';
  str$ = from(this.str);

  // Depuis un tableau
  nums: Array<number> = [33, 45, 23, 23, 4, 5];
  nums$: Observable<number> = from(this.nums);

  // Depuis un tableau d'objet

  users: Array<any> = [
    {
      name: 'John Doe',
      email: 'jdoe@yopmail.com'
    },
    {
      name: 'User 2',
      email: 'u2@yopmail.com'
    }
  ];
  users$: Observable<any> = from(this.users);

  // Idem pour les autres type de structure, Map, Set etc...
  map: Map<number, number> = new Map([[1, 2], [2, 3]]);
  map$: Observable<any> = from(this.map);


  public ngOnInit() {

    this.str$.subscribe((val) => {
      console.log('valeur recu');
      this.monTexte = val;
    });

    setTimeout(() => {
      console.log('nouvelle valeur');
      this.str = 'ma2emval';
    }, 1000 );

    /*const obs: Observable<string> = from('keyup').map((e) => {
      // typescript: Property 'target' does not exist on type '{}'
      return e;
    });

    obs.subscribe((txt) => {
      console.log(txt, 'texte recu');
      this.monTexte = txt;
    });*/
  }

}

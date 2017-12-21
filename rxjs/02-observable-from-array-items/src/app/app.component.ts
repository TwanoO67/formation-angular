import { Component, ViewChild, ElementRef } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { from } from 'rxjs/observable/from';
import { Subscriber } from './subscriber';

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
    { name: 'John Doe', email: 'jdoe@gmail.com' },
    { name: 'Sam Smith', email: 'ssmith@gmail.com' },
    { name: 'Jen Thompson', email: 'jthompson@gmail.com' }
  ];
  users$: Observable<any> = from(this.users);
  
  // Idem pour les autres type de structure, Map, Set etc...
  map: Map<number, number> = new Map([[1, 2], [3, 4], [5,6]]);
  map$: Observable<any> = from(this.map as any);
  
  // Observable From Set
  s = new Set(['Foo', 43, { name: 'Jeff'}]);
  s$ = from(this.s as any);
  
  public ngOnInit() {

    // les enregistrements
    this.str$.subscribe(Subscriber.create('str'));
    this.nums$.subscribe(Subscriber.create('user'));
    this.users$.subscribe(Subscriber.create('user'));
    this.map$.subscribe(Subscriber.create('map'));
    this.s$.subscribe(Subscriber.create('set'));
  }

}

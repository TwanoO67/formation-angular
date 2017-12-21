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
  @ViewChild('txtinput') input;
  // le produit trouvé
  product;

  // les produits disponible
  products = [
    { id: '1', name: 'Red T-Shirt'  , price: 4.99  },
    { id: '2', name: 'Blue Pants'   , price: 9.99  },
    { id: '3', name: 'Green Hat'    , price: 7.99  },
    { id: '4', name: 'Yellow Jacket', price: 24.99 }   
  ];

  public ngOnInit() {

    // on s'enregistre sur les evenements de clavier
    fromEvent(this.input.nativeElement, 'keyup')
    // on recupere le texte
    .map( (e:Event) => (e.target as HTMLInputElement).value)
    .subscribe(x => {
        console.log('texte recu');
        //on ré-initialise le produit
        this.product = null;
        // pour chaque texte recu
        from(this.products)
        // on filtre les produits
        .filter(i => i.id == x)
        // si on a le bon on l'envoi dans le html
        .subscribe(x => {
            console.log('produit trouvé');
            this.product = x;
        });
    });


    //ATTENTTION mauvaise pratique ici
    // - subscribe dans subscribe à bannir
    // - filter peut renvoyé plusieurs elements, ici on ne garde que le dernier
    // - on ne peut pas réagir quand on ne trouve pas de bon produit ( à cause du filter)


  }

}

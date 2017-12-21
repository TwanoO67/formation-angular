import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/pluck';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { from } from 'rxjs/observable/from';
import { interval } from 'rxjs/observable/interval';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  monTexte = '';
  compteur_num = 0;

  @ViewChild('texte') input;

  public ngOnInit() {

    interval(1000)
    .take(10)
    .map((v) => {
      return (v * 2);
    })
    .subscribe( ...this.getSubscriber('map') );

    const names = ['Bob', 'Jane', 'Mike'];
    from(names).map(
      (v) => {
        return v.toUpperCase();
      }
    );

    fromEvent(this.input.nativeElement, 'keyup')
    // on filtre l'objet event pour recuperer la valeur de l'input
    .map((e: Event) => {
      return (e.target as HTMLInputElement).value;
    })
    // on transforme dans un nouvelle objet
    .map( (v: string) => {
      return {
        value: v,
        nombre: v.length
      };
    })
    // on s'enregistre pour afficher les objets
    .subscribe((obj) => {
      this.monTexte = obj.nombre.toString();
    });


    // recupération uniquement d'un champ
    const tableau = [
      { value : 0},
      { value : 1},
      { value : 2}
    ];

    from(tableau)
    .pluck('value')
    .subscribe( ...this.getSubscriber('pluck') );

  }


  private getSubscriber(prefix: string) {
    const subscriber = [
      (val) => {
        console.log(prefix + ': ' + val);
        this.monTexte = val;
      },
      (error) => {
        console.log(prefix + 'error');
      },
      () => {
        console.log(prefix + ' completed ');
      }
    ];
    return subscriber;
  }

}



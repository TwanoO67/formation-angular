import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/share';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { from } from 'rxjs/observable/from';
import { Compteur } from './compteur';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  monTexte = '';
  compteur_num = 0;

  public ngOnInit() {

    // COLD is when your observable creates the producer
    // COLD
    const cold = new Observable((observer) => {
      let count = new Compteur(this.compteur_num++);
      count.subscribe((int) => {
        observer.next(int);
      });
    });
    // Interet : on est sur de recevoir le contenu, puisqu'il est crée à la demande
    // Inconvénient : chaque enregistrement créée un producteur de contenu (ici un compteur) UNICAST

    // HOT is when your observable closes over the producer
    // HOT
    const count2 = new Compteur(this.compteur_num++);
    const hot = new Observable((observer) => {
      // have observer listen to producer here
      count2.subscribe((int) => {
        observer.next(int);
      });
    });
    // Interet: plusieurs enregistrement peuvent ecouter le même producer (ici le compteur) MULTICAST
    // Inconvénient: des contenus peuvent se perdre si personne n'écoute à ce moment là

    // On attend 2 sec avant de s'enregistrer, pour voir les différences

    setTimeout(() => {
        cold.subscribe( ...this.getSubscriber('Cold Listener 1') );
        hot.subscribe(...this.getSubscriber('Hot Listener 1'));
    }, 2000);

    /**
    // si on ajoute d'autre listener sur les mêmes observable
    setTimeout(() => {
      cold.subscribe( ...this.getSubscriber('Cold Listener 2') );
      hot.subscribe(...this.getSubscriber('Hot Listener 2'));
    }, 3100);

    // on constate que le cold crée un nouveau compteur, alors que le hot le partage
  */

    /**
    // parfois, on ne maitriste pas un observable, et du coup on peut vouloir transformer un cold en hot
    // pour ainsi pouvoir partager ses données plusieurs fois
    // On peut "construire" ça avec un Subject, qui s'enregistre sur un observable cold

    const hotfromcold = new Subject();
    cold.subscribe(hotfromcold);

    setTimeout(() => {
        hotfromcold.subscribe( ...this.getSubscriber('Cold to Hot Listener') );
        hotfromcold.subscribe( ...this.getSubscriber('Cold to Hot Listener 2') );
    }, 4600);

    // cette opération de transformer un cold en hot, peut aussi se faire avec l'opérateur publish()
    // pour dire qu'un observable devient multicast
    // et connect(), pour dire à quel moment il doit commencer

    const coldhot1 = cold.publish().connect();

    // ces 2 étapes peuvent etre séparé dans le temps (pour etre sur que tout les subscribers sont là, avant le connect)

     const coldhot2 = cold.publish();
     coldhot2.subscribe( ...this.getSubscriber('Cold to Hot Listener3') );
     coldhot2.subscribe( ...this.getSubscriber('Cold to Hot Listener4') );
     coldhot2.connect();

    // mais ces 2 étapes peuvent aussi s'écrire en une fois, avec l'opérateur share()
    const coldhot3 = cold.share();

    // C'est aussi là qu'il est intéréssant de voir les ReplaySubject, quand on veut que chaque subscriber puisse obtenir une data à son inscription

     */

    // Plus en détail
    // voir : https://blog.thoughtram.io/angular/2016/06/16/cold-vs-hot-observables.html


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



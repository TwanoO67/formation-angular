import { Component, ViewChild, ElementRef } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import { fromEvent } from 'rxjs/observable/fromEvent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  monTexte = '';

  @ViewChild('moninput') moninput: ElementRef;

  public ngOnInit() {
    console.log(this.moninput.nativeElement.value);

    const obs: Observable<string> = fromEvent(this.moninput.nativeElement, 'keyup').map((e: KeyboardEvent) => {
      // typescript: Property 'target' does not exist on type '{}'
      return e.target.value;
    });

    obs.subscribe((txt) => {
      console.log(txt, 'texte recu');
      this.monTexte = txt;
    });
  }

}

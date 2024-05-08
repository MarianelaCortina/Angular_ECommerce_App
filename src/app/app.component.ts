import { Component, HostListener } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-challenge-app';

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander(event: Event) {
    localStorage.clear(); // Limpia el localStorage cuando la página se está recargando o cerrando
  }
  
 

}

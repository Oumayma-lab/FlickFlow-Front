import {Component, inject, OnInit} from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import { routes } from './app.routes';
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {fontAwesomeIcons} from "./shared/font-awesome-icons";
import {NavbarComponent} from "./navbar/navbar.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html'

})

export class AppComponent  implements  OnInit{
  title = 'FlickFlow';
  faIconLibrary = inject(FaIconLibrary)

  ngOnInit(): void {
    this.initFontAwesome();

  }

  private initFontAwesome() {
  this.faIconLibrary.addIcons(...fontAwesomeIcons);
  }
}

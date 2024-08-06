import { Component } from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {MainContentComponent} from "./main-content/main-content.component";
import {RouterOutlet} from "@angular/router";
import {MovieSelectorComponent} from "./movie-selector/movie-selector.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, MainContentComponent, RouterOutlet, MovieSelectorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

import {Component, effect, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TmdbService} from "../services/tmdb.service";
import {Movie} from "../services/model/movie";
import {debounce, filter, interval, map} from "rxjs";
import {MovieCardComponent} from "../home/movie-selector/movie-list/movie-card/movie-card.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {MainContentComponent} from "../home/main-content/main-content.component";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MovieCardComponent,
    NavbarComponent,
    MainContentComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  activatedRoute = inject(ActivatedRoute);

  tmdbService = inject(TmdbService);

  movies: Movie[] | undefined;


  constructor() {
    effect(() => {
      let moviesResponse = this.tmdbService.search().value;
      if(moviesResponse !== undefined) {
        this.movies = moviesResponse.results;
      }
    });
  }

  ngOnInit(): void {
    this.onSearchTerm();
  }

  private onSearchTerm(): void {
    this.activatedRoute.queryParams.pipe(
      filter(queryParam => queryParam['q']),
      debounce(() => interval(300)),
      map(queryParam => queryParam['q']),
    ).subscribe({
      next: term => this.tmdbService.searchByTerm(term)
    })
  }
}

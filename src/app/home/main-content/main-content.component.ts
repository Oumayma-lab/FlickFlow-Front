import { Component, effect, inject, OnInit } from '@angular/core';
import { FaIconComponent, FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { Movie } from "../../services/model/movie";
import { TmdbService } from "../../services/tmdb.service";

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    FaIconComponent, FontAwesomeModule
  ],
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  tmdbService = inject(TmdbService);

  trendMovie: Movie | undefined;

  constructor() {
    effect(() => {
      const trendMovieResponse = this.tmdbService.fetchTrendMovie().value;
      if (trendMovieResponse) {
        this.trendMovie = trendMovieResponse.results[0];
      }
    });
  }

  ngOnInit(): void {
    this.fetchMovieTrends();
  }

  fetchMovieTrends(): void {
    this.tmdbService.getTrends();
  }
}

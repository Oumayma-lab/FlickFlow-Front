import {Component, inject, Input} from '@angular/core';
import { Movie } from "../../../../services/model/movie";
import { TmdbService } from "../../../../services/tmdb.service";

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {

  @Input() movie: Movie | undefined;

  tmdbService = inject(TmdbService);

}

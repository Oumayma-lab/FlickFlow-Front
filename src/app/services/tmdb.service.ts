import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import { Movie, MovieApiResponse } from "./model/movie";
import { State } from "./model/state";
import { environment } from "../../environments/environment";
import { GenresResponse } from "./model/genre";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {MoreInfosComponent} from "../home/more-infos/more-infos.component";
// import { MoreInfosComponent } from "../home/more-infos/more-infos.component";

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  http = inject(HttpClient);
  modalService = inject(NgbModal);

  baseURL = 'https://api.themoviedb.org';

  private fetchTrendMovie$: WritableSignal<State<MovieApiResponse, HttpErrorResponse>>
    = signal(State.Builder<MovieApiResponse, HttpErrorResponse>().forInit().build());
  fetchTrendMovie = computed(() => this.fetchTrendMovie$());

  private genres$: WritableSignal<State<GenresResponse, HttpErrorResponse>>
    = signal(State.Builder<GenresResponse, HttpErrorResponse>().forInit().build());
  genres = computed(() => this.genres$());

  private moviesByGenre$: WritableSignal<State<MovieApiResponse, HttpErrorResponse>>
    = signal(State.Builder<MovieApiResponse, HttpErrorResponse>().forInit().build());
  moviesByGenre = computed(() => this.moviesByGenre$());

  private movieById$: WritableSignal<State<Movie, HttpErrorResponse>>
    = signal(State.Builder<Movie, HttpErrorResponse>().forInit().build());
  movieById = computed(() => this.movieById$());

  private search$: WritableSignal<State<MovieApiResponse, HttpErrorResponse>>
    = signal(State.Builder<MovieApiResponse, HttpErrorResponse>().forInit().build());
  search = computed(() => this.search$());

  getTrends(): void {
    this.http.get<MovieApiResponse>(
      `${this.baseURL}/3/trending/movie/day?api_key=${environment.TMDB_API_KEY}`)
      .subscribe({
        next: tmdbResponse =>
          this.fetchTrendMovie$
            .set(State.Builder<MovieApiResponse, HttpErrorResponse>()
              .forSuccess(tmdbResponse).build()),
        error: err => {
          this.fetchTrendMovie$
            .set(State.Builder<MovieApiResponse, HttpErrorResponse>()
              .forError(err).build())
        }
      });
  }

  getAllGenres(): void {
    this.http.get<GenresResponse>(
      `${this.baseURL}/3/genre/movie/list?api_key=${environment.TMDB_API_KEY}`)
      .subscribe({
        next: genresResponse =>
          this.genres$
            .set(State.Builder<GenresResponse, HttpErrorResponse>()
              .forSuccess(genresResponse).build()),
        error: err => {
          this.genres$
            .set(State.Builder<GenresResponse, HttpErrorResponse>()
              .forError(err).build())
        }
      });
  }

  getImageURL(id: string, size: 'original' | 'w500' | 'w200'): string {
    return `https://image.tmdb.org/t/p/${size}/${id}`;
  }

  getMoviesByGenre(genreId: number): void {
    let queryParam = new HttpParams();
    queryParam = queryParam.set("language", "en-US");
    queryParam = queryParam.set("with_genres", genreId);
    this.http.get<MovieApiResponse>(
      `${this.baseURL}/3/discover/movie?api_key=${environment.TMDB_API_KEY}`, {params: queryParam})
      .subscribe({
        next: moviesByGenreResponse => {
          moviesByGenreResponse.genreId = genreId;
          this.moviesByGenre$
            .set(State.Builder<MovieApiResponse, HttpErrorResponse>()
              .forSuccess(moviesByGenreResponse).build())
        },
        error: err => {
          this.moviesByGenre$
            .set(State.Builder<MovieApiResponse, HttpErrorResponse>()
              .forError(err).build())
        }
      });
  }

  getMovieById(id: number): void {
    this.http.get<Movie>(
      `${this.baseURL}/3/movie/${id}?api_key=${environment.TMDB_API_KEY}`)
      .subscribe({
        next: movieResponse => {
          this.movieById$
            .set(State.Builder<Movie, HttpErrorResponse>()
              .forSuccess(movieResponse).build())
        },
        error: err => {
          this.movieById$
            .set(State.Builder<Movie, HttpErrorResponse>()
              .forError(err).build())
        }
      });
  }

  constructor() { }

  clearGetMovieById() {
    this.movieById$.set(State.Builder<Movie, HttpErrorResponse>().forInit().build());
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${environment.TMDB_API_KEY}`);
  }
  openMoreInfos(movieId: number): void {
    let moreInfoModal = this.modalService.open(MoreInfosComponent);
    moreInfoModal.componentInstance.movieId = movieId;
  }

  searchByTerm(term: string): void {
    let queryParam = new HttpParams();
    queryParam = queryParam.set("language", "en-US");
    queryParam = queryParam.set("query", term);
    this.http.get<MovieApiResponse>(
      `${this.baseURL}/3/search/movie?api_key=${environment.TMDB_API_KEY}`, {params: queryParam})
      .subscribe({
        next: searchByTerm => {
          this.search$
            .set(State.Builder<MovieApiResponse, HttpErrorResponse>()
              .forSuccess(searchByTerm).build())
        },
        error: err => {
          this.search$
            .set(State.Builder<MovieApiResponse, HttpErrorResponse>()
              .forError(err).build())
        }
      });
  }
}

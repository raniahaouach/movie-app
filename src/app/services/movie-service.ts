import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from '../../environmrents/environment';
import { Movie } from '../interfaces/movie';
import { MovieResponse } from '../interfaces/movie-response';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.url_api;
  private readonly key = environment.api_key;
  private readonly movieURL = environment.url_movie_api;
  public movieList=signal<Movie[]>([]);
  public selectedMovie=signal<Movie | null>(null);
  public wishList=signal<Movie[]>([]);

  constructor() {
    if (typeof localStorage === 'undefined') {
      return;
    }

    const savedWishList = localStorage.getItem('wishList');
    if (!savedWishList) {
      return;
    }

    try {
      const movies: unknown = JSON.parse(savedWishList);
      if (Array.isArray(movies)) {
        this.wishList.set(movies as Movie[]);
      } else {
        console.error('Saved wishlist is not a valid movie list.');
      }
    } catch (error) {
      console.error('Could not load the saved wishlist.', error);
    }
  }

  getMovieList(): Observable<Movie[]> {
    return this.http
      .get<MovieResponse>(`${this.url}?api_key=${this.key}`)
      .pipe(map((response) => response.results));
  }
  getMovieById(id: number){
    return this.http.get<Movie>(`${this.movieURL}/${id}?api_key=${this.key}`).pipe(
      map((response) => response)
    );
  }
  addToWishList(movie: Movie) {
    const wishList = this.wishList();
    if (wishList.some((savedMovie) => savedMovie.id === movie.id)) {
      return;
    }

    const updatedWishList = [...wishList, movie];
    this.wishList.set(updatedWishList);

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('wishList', JSON.stringify(updatedWishList));
    }
  }

  removeFromWishList(movie: Movie) {
    const updatedWishList = this.wishList().filter(
      (savedMovie) => savedMovie.id !== movie.id,
    );
    this.wishList.set(updatedWishList);

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('wishList', JSON.stringify(updatedWishList));
    }
  }
}

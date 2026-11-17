import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../interfaces/movie';

type SortOption = 'default' | 'year' | 'rating' | 'popularity';

@Component({
  selector: 'app-movie-list',
  styleUrl: './movie-list.css',
  templateUrl: './movie-list.html',
})
export class MovieList implements OnInit {
  readonly router = inject(Router);
  readonly movieService = inject(MovieService);
  readonly selectedGenre = signal<number | null>(null);
  readonly selectedYear = signal<string | null>(null);
  readonly sortBy = signal<SortOption>('default');
  readonly genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Aventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comédie' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentaire' },
    { id: 18, name: 'Drame' },
    { id: 10751, name: 'Familial' },
    { id: 14, name: 'Fantastique' },
    { id: 36, name: 'Histoire' },
    { id: 27, name: 'Horreur' },
    { id: 10402, name: 'Musique' },
    { id: 9648, name: 'Mystère' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science-fiction' },
    { id: 10770, name: 'Téléfilm' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'Guerre' },
    { id: 37, name: 'Western' },
  ];
  readonly years = computed(() =>
    [...new Set(
      this.movieService.movieList()
        .map((movie) => movie.release_date?.slice(0, 4))
        .filter((year): year is string => !!year && /^\d{4}$/.test(year)),
    )].sort((a, b) => b.localeCompare(a)),
  );
  readonly filteredMovies = computed(() => {
    const genre = this.selectedGenre();
    const year = this.selectedYear();
    const movies = this.movieService.movieList().filter((movie) =>
      (genre === null || movie.genre_ids.includes(genre)) &&
      (year === null || movie.release_date?.startsWith(year)),
    );

    switch (this.sortBy()) {
      case 'year':
        return [...movies].sort((a, b) => b.release_date.localeCompare(a.release_date));
      case 'rating':
        return [...movies].sort((a, b) => b.vote_average - a.vote_average);
      case 'popularity':
        return [...movies].sort((a, b) => b.popularity - a.popularity);
      default:
        return movies;
    }
  });

  ngOnInit(): void {
    this.movieService.getMovieList().subscribe(
      (response) => this.movieService.movieList.set(response)
    );
  }

  setGenre(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedGenre.set(value ? Number(value) : null);
  }

  setYear(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedYear.set(value || null);
  }

  setSort(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    if (value === 'year' || value === 'rating' || value === 'popularity') {
      this.sortBy.set(value);
    } else {
      this.sortBy.set('default');
    }
  }

  ratingClass(rating: number): string {
    if (rating >= 7) {
      return 'rating-high';
    }

    return rating >= 5 ? 'rating-medium' : 'rating-low';
  }

  navigateTo(movie: Movie) {
    this.router.navigate(['/', movie.id]);
  }
}
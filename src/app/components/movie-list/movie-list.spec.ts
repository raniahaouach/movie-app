import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { Movie } from '../../interfaces/movie';
import { MovieService } from '../../services/movie-service';
import { MovieList } from './movie-list';

describe('MovieList', () => {
  let component: MovieList;
  let fixture: ComponentFixture<MovieList>;
  const movies: Movie[] = [
    {
      adult: false,
      backdrop_path: '',
      genre_ids: [28],
      id: 1,
      title: 'Action 2024',
      original_language: 'en',
      original_title: 'Action 2024',
      overview: '',
      popularity: 12,
      poster_path: '/poster.jpg',
      release_date: '2024-01-01',
      softcore: false,
      video: false,
      vote_average: 7,
      vote_count: 1,
    },
    {
      adult: false,
      backdrop_path: '',
      genre_ids: [35],
      id: 2,
      title: 'Comedy 2025',
      original_language: 'en',
      original_title: 'Comedy 2025',
      overview: '',
      popularity: 30,
      poster_path: '/poster.jpg',
      release_date: '2025-01-01',
      softcore: false,
      video: false,
      vote_average: 8,
      vote_count: 1,
    },
    {
      adult: false,
      backdrop_path: '',
      genre_ids: [28],
      id: 3,
      title: 'Action 2025',
      original_language: 'en',
      original_title: 'Action 2025',
      overview: '',
      popularity: 20,
      poster_path: '/poster.jpg',
      release_date: '2025-02-01',
      softcore: false,
      video: false,
      vote_average: 9,
      vote_count: 1,
    },
  ];

  beforeEach(async () => {
    const movieList = signal<Movie[]>([]);
    await TestBed.configureTestingModule({
      imports: [MovieList],
      providers: [
        provideRouter([]),
        {
          provide: MovieService,
          useValue: { movieList, getMovieList: () => of(movies) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('filters movies by genre and year', () => {
    component.selectedGenre.set(28);
    component.selectedYear.set('2025');

    expect(component.filteredMovies().map((movie) => movie.id)).toEqual([3]);
  });

  it('sorts movies by rating and popularity without changing the source list', () => {
    component.sortBy.set('rating');
    expect(component.filteredMovies().map((movie) => movie.id)).toEqual([3, 2, 1]);

    component.sortBy.set('popularity');
    expect(component.filteredMovies().map((movie) => movie.id)).toEqual([2, 3, 1]);
    expect(component.movieService.movieList().map((movie) => movie.id)).toEqual([1, 2, 3]);
  });

  it('provides available years in descending order', () => {
    expect(component.years()).toEqual(['2025', '2024']);
  });

  it('assigns rating badge colors at the requested thresholds', () => {
    expect(component.ratingClass(7)).toBe('rating-high');
    expect(component.ratingClass(6.9)).toBe('rating-medium');
    expect(component.ratingClass(5)).toBe('rating-medium');
    expect(component.ratingClass(4.9)).toBe('rating-low');
  });
});

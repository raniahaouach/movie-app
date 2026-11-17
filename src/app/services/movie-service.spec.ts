import { TestBed } from '@angular/core/testing';
import { MovieService } from './movie-service';
import { Movie } from '../interfaces/movie';

describe('MovieService', () => {
  let service: MovieService;
  const movie: Movie = {
    adult: false,
    backdrop_path: '',
    genre_ids: [],
    id: 1,
    title: 'Test movie',
    original_language: 'en',
    original_title: 'Test movie',
    overview: '',
    popularity: 0,
    poster_path: '/poster.jpg',
    release_date: '2025-01-01',
    softcore: false,
    video: false,
    vote_average: 0,
    vote_count: 0,
  };

  beforeEach(() => {
    localStorage.removeItem('wishList');
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieService);
  });

  afterEach(() => {
    localStorage.removeItem('wishList');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('adds a movie to the wishlist and saves it', () => {
    service.addToWishList(movie);

    expect(service.wishList()).toEqual([movie]);
    expect(JSON.parse(localStorage.getItem('wishList')!)).toEqual([movie]);
  });

  it('does not add the same movie more than once', () => {
    service.addToWishList(movie);
    service.addToWishList(movie);

    expect(service.wishList()).toEqual([movie]);
  });

  it('restores saved movies when the service is created', () => {
    TestBed.resetTestingModule();
    localStorage.setItem('wishList', JSON.stringify([movie]));
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieService);

    expect(service.wishList()).toEqual([movie]);
  });
});

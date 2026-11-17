import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Router, provideRouter } from '@angular/router';
import { Movie } from '../../interfaces/movie';
import { MovieService } from '../../services/movie-service';
import { WishList } from './wish-list';

describe('WishList', () => {
  let component: WishList;
  let fixture: ComponentFixture<WishList>;
  let wishList: ReturnType<typeof signal<Movie[]>>;
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
    vote_average: 7,
    vote_count: 1,
  };

  beforeEach(async () => {
    wishList = signal<Movie[]>([movie]);
    await TestBed.configureTestingModule({
      imports: [WishList],
      providers: [
        provideRouter([]),
        {
          provide: MovieService,
          useValue: {
            wishList,
            removeFromWishList: (removedMovie: Movie) =>
              wishList.update((movies) => movies.filter(({ id }) => id !== removedMovie.id)),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WishList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('removes a movie when its remove button is clicked', () => {
    fixture.nativeElement.querySelector('.remove-button').click();
    fixture.detectChanges();

    expect(wishList()).toEqual([]);
    expect(fixture.nativeElement.textContent).toContain('Your wishlist is empty.');
  });

  it('navigates to the movie list when back is clicked', async () => {
    fixture.nativeElement.querySelector('.back-button').click();
    await fixture.whenStable();

    expect(TestBed.inject(Router).url).toBe('/');
  });
});

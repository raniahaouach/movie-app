import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'app-wish-list',
  styleUrl: './wish-list.css',
  templateUrl: './wish-list.html',
})
export class WishList {
  readonly movieService = inject(MovieService);
  private readonly router = inject(Router);

  backToList(): void {
    this.router.navigate(['/']);
  }

  removeFromWishList(movie: Movie): void {
    this.movieService.removeFromWishList(movie);
  }
}

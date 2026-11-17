import { Component, inject } from '@angular/core';
import { MovieService } from '../../services/movie-service';

@Component({
  imports: [],
  selector: 'app-wish-list',
  styleUrl: './wish-list.css',
  templateUrl: './wish-list.html',
})
export class WishList {
  movieService = inject(MovieService);
}

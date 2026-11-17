import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css',
})
export class MovieDetail implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);          // ← manquait
  movieService = inject(MovieService);

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.movieService.getMovieById(id);
      })
    ).subscribe(movie => this.movieService.selectedMovie.set(movie));
  }

  backToMovieList() {
    this.router.navigate(['/']);
  }

  addToWishList(movie: Movie) {
    this.movieService.addToWishList(movie);
  }
}
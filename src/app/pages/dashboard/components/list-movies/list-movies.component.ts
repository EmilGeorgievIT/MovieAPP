import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { JWTTokenService } from 'src/app/shared/services/jwt-token.service';
import { Movie } from '../../models/movie-model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.scss']
})
export class ListMoviesComponent implements OnInit, OnDestroy {
  subsctiption: Subscription;
  listMovies: Movie[] = [];
  isLoading = false;

  constructor(
    public movieService: MovieService,
    private domSanitizer: DomSanitizer,
    private jwtTokenService: JWTTokenService
  ) { }

  ngOnInit(): void {
    this.getMovieList();
  }

  getMovieList(): void {
    this.isLoading = true;
    const userId = this.jwtTokenService.getDecodeToken().id;
    this.subsctiption = this.movieService.getMoviesByUserId(userId)
    .subscribe((data: Movie[]) => {
      this.listMovies = [...data];
      this.listMovies.forEach((movie) => {
        const base64String = this.movieService.createImageFromBlob(movie.photo.data);
        movie.photo = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, '+ base64String);
      });
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    })
  }

  ngOnDestroy() {
    if (this.subsctiption) {
      this.subsctiption.unsubscribe();
    }
  }
}

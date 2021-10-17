import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { JWTTokenService } from 'src/app/shared/services/jwt-token.service';
import { Movie } from '../../models/movie-model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.scss']
})
export class ListMoviesComponent implements OnInit {
  subsctiption: Subscription;
  listMovies: Movie[] = [];
  isLoading = false;

  constructor(
    public movieService: MovieService,
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
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    })
  }
}

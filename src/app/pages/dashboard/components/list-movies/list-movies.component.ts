import { Component, OnInit } from '@angular/core';
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
export class ListMoviesComponent implements OnInit {
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
        const base64String = this.createImageFromBlob(movie.photo.data);
        movie.photo = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, '+ base64String);
      });
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    })
  }

  createImageFromBlob(image: ArrayBuffer): string | null {
    let typedArray = new Uint8Array(image);
    let stringCharacters = '';

    stringCharacters = typedArray.reduce((data, byte)=> {
      return data + String.fromCharCode(byte);
      }, '');

    let base64String = btoa(stringCharacters);

    return base64String;
  }
}

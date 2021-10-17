import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Movie } from '../../models/movie-model';
import { MovieService } from '../../services/movie.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-preview-movie',
  templateUrl: './preview-movie.component.html',
  styleUrls: ['./preview-movie.component.scss']
})
export class PreviewMovieComponent implements OnInit, OnDestroy {
  movie: Movie;
  isLoading = false;
  subsctiption: Subscription;

  constructor(
    public movieService: MovieService,
    private domSanitizer: DomSanitizer,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCurrentMovieDetails();
  }

  getCurrentMovieDetails(): void {
    this.isLoading = true;
    const movieId = this.activeRoute.snapshot.paramMap.get('movieId');

    this.subsctiption = this.movieService.getMovieDetails(movieId)
    .subscribe((data: Movie) => {
      this.movie = data;
      
      const base64String = this.createImageFromBlob(data.photo.data);
      this.movie.photo = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, '+ base64String);
      this.isLoading = false;
      console.log(this.movie);
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

  ngOnDestroy() {
    if (this.subsctiption) {
      this.subsctiption.unsubscribe();
    }
  }

}

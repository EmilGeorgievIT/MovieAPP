import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';;
import { MovieService } from '../dashboard/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoading = false;
  subsctiption: Subscription;
  images = [];
  
  constructor(
    private movieService: MovieService,
    private domSanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.getAllImagesFromMovies();
  }

  getAllImagesFromMovies(): void {
    this.isLoading = true;

    this.subsctiption = this.movieService.getAllMovieImages()
    .subscribe((images: { photo: ArrayBuffer[]}[]) => {
      images.forEach((image: any) => {
        const base64String = this.movieService.createImageFromBlob(image.photo.data);
        const bypassSecurityTrustUrl = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, '+ base64String)
        this.images.push(bypassSecurityTrustUrl);
      });
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    })
  }

  ngOnDestroy(): void {
    if(this.subsctiption) {
      this.subsctiption.unsubscribe();
    }
  }
}

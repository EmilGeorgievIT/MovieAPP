import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { snackBarConfig } from 'src/app/shared/configs/snack-bar.config';
import { ApiResponse } from 'src/app/shared/models/api-response.model';
import { JWTTokenService } from 'src/app/shared/services/jwt-token.service';
import { UrlConstants } from 'src/app/shared/utils/url-constants';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {
  subsctiption: Subscription;
  imageFile: File;
  addMovieForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required ]),
    director: new FormControl('', [Validators.required ]), 
    rank: new FormControl('', [Validators.required ]),
    releaseDate: new FormControl('', [Validators.required ]),
    boxoffice: new FormControl('', [Validators.required ]),
    category: new FormControl('', [Validators.required ]),
    thePilot: new FormControl('', [Validators.maxLength(1000), Validators.required ]),
    country: new FormControl('', [Validators.required ]),
  });

  formControlInput(name: string) { return this.addMovieForm.get(name); }

  constructor(
    private movieService: MovieService,
    private snackBar: MatSnackBar,
    private jwtTokenService: JWTTokenService,
    private router: Router
  ) { }

  ngOnInit(): void {}
  
  onImageUpload(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imageFile = file;
    }
  }

  submitMovie(): void {
    if(this.addMovieForm.valid) {
      const userId = this.jwtTokenService.getDecodeToken().id;
      this.subsctiption = this.movieService.addMovie({
        ...this.addMovieForm.value,
        photo: this.imageFile,
        createdBy: userId 
      })
      .subscribe((data: ApiResponse) => {
        this.snackBar.open(data.message, 'Success', {
          duration:  snackBarConfig.duration,
          horizontalPosition: snackBarConfig.horizontalPosition,
          verticalPosition: snackBarConfig.verticalPosition
        });
        this.addMovieForm.reset();
        this.router.navigate([UrlConstants.DASHBOARD]);
      }, error => {
        const errorMessage = error?.error?.message ? error.error.message : error;
        this.snackBar.open(errorMessage, 'Error', {
          duration:  snackBarConfig.duration,
          horizontalPosition: snackBarConfig.horizontalPosition,
          verticalPosition: snackBarConfig.verticalPosition
        });
      })
    }
  }

  ngOnDestroy(): void {
    if (this.subsctiption) {
      this.subsctiption.unsubscribe();
    }
  }

}

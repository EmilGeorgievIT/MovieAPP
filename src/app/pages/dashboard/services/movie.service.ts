import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/shared/models/api-response.model';
import { Movie } from '../models/movie-model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  /**
   *  Get all movies in DB
   * @returns Observable<ApiResponse>
   */
  getAllMovies(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('/api/movie/getAllMovies');
  }

  /**
   *  Get all movies for specific user ID
   * @returns Observable<ApiResponse>
   */
   getMoviesByUserId(userId: string): Observable<Movie[]> {
    return this.http
    .get<ApiResponse>('/api/movie/getMoviesByUserId?userId=' + userId)
    .pipe(map((response: ApiResponse) => response.result));
  }

  /**
   *  Get all images from movies
   * @returns Observable<{ photo: []}>
   */
   getAllMovieImages(): Observable<{ photo: ArrayBuffer[]}[]> {
    return this.http
    .get<ApiResponse>('/api/movie/getAllMovieImages')
    .pipe(map((response: ApiResponse) => response.result));
  }

  /**
   *  Get movie details for specific movie ID
   * @returns Observable<ApiResponse>
   */
   getMovieDetails(movieId: string): Observable<Movie> {
    return this.http
    .get<ApiResponse>('/api/movie/getMovieDetails?movieId=' + movieId)
    .pipe(map((response: ApiResponse) => response.result));
  }

  /**
   *  A method to add new movie to DB
   * @returns Observable<ApiResponse>
   */
   addMovie(payload: any): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('name', payload.name);
    formData.append('director', payload.director);
    formData.append('rank', payload.rank);
    formData.append('releaseDate', payload.releaseDate);
    formData.append('boxoffice', payload.boxoffice);
    formData.append('category', payload.category);
    formData.append('thePilot', payload.thePilot);
    formData.append('country', payload.country);
    formData.append('createdBy', payload.createdBy);
    formData.append('photo', payload.photo);

    return this.http.post<ApiResponse>('/api/movie/createMovie', formData);
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

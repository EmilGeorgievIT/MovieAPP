import { Routes } from '@angular/router';
import { UrlConstants } from 'src/app/shared/utils/url-constants';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { ListMoviesComponent } from './components/list-movies/list-movies.component';
import { PreviewMovieComponent } from './components/preview-movie/preview-movie.component';
import { DashboardComponent } from './dashboard.component';

export const dashboardRoutes: Routes = [{
  path: '',
  component: DashboardComponent,
  children: [
    {
        path: '',
        component: ListMoviesComponent
    },
    {
        path: UrlConstants.ADD_MOVIE,
        component: AddMovieComponent
    },
    {
      path: UrlConstants.PREVIEW_MOVIE,
      component: PreviewMovieComponent
    }
  ]
}];

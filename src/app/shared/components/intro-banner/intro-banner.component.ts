import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-intro-banner',
  templateUrl: './intro-banner.component.html',
  styleUrls: ['./intro-banner.component.scss']
})
export class IntroBannerComponent {
  @Input() image: string = '/assets/images/intro-banner.jpg';
  @Input() content: string = "Movie APP is the world's most popular and authoritative source for movie, TV and celebrity content. Find ratings and reviews for the newest movie and TV shows.";

  constructor() { }
}

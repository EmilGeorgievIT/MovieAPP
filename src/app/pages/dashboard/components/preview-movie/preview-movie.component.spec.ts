import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewMovieComponent } from './preview-movie.component';

describe('PreviewMovieComponent', () => {
  let component: PreviewMovieComponent;
  let fixture: ComponentFixture<PreviewMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewMovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

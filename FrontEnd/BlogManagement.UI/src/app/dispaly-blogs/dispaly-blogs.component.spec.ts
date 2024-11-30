import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispalyBlogsComponent } from './dispaly-blogs.component';

describe('DispalyBlogsComponent', () => {
  let component: DispalyBlogsComponent;
  let fixture: ComponentFixture<DispalyBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DispalyBlogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DispalyBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasComponent } from './notas.component';

describe('NotesComponent', () => {
  let component: NotasComponent;
  let fixture: ComponentFixture<NotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { ApiService } from 'src/app/services/api.service';
import { Serie } from 'src/app/interfaces/ISerie';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  let router: Router;

  beforeEach(() => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['searchResults$']);

    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: ApiService, useValue: apiServiceSpy }],
    });

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getSeries', () => {
    it('should set searchResults$ with the value from apiService', fakeAsync(() => {
      const fakeSearchResults:Serie[] = [{ show: { id: 1, name: 'Show 1', image: {medium:'src/image'}, rating:{average: 5.0}, summary:'description' } }]
      apiService.searchResults$ = of(fakeSearchResults);

      component.getSeries();
      tick(); // Wait for the asynchronous operation to complete

      let actualResults: any;
      component.searchResults$.subscribe((results: any) => actualResults = results);

      expect(actualResults).toEqual(fakeSearchResults);
    }));
  });

  describe('goToDetail', () => {
    it('should navigate to detail page with the provided id', () => {
      const routerNavigateSpy = spyOn(router, 'navigate');
      const fakeId = 123;

      component.goToDetail(fakeId);

      expect(routerNavigateSpy).toHaveBeenCalledWith(['/detail', fakeId]);
    });
  });

});

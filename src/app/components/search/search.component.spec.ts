import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { SearchComponent } from './search.component';
import { ApiService } from 'src/app/services/api.service';


describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getData']);

    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: ApiService, useValue: apiServiceSpy }],
    });

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize searchResults$ observable', fakeAsync(() => {

      const mockValue = 'test';
      const mockResults = [{ id: 1, name: 'Result 1' }, { id: 2, name: 'Result 2' }];
      apiService.getData.and.returnValue(of(mockResults));

      // Trigger ngOnInit
      component.ngOnInit();
      component.searchControl.setValue(mockValue);
      tick(500); // Wait for debounceTime

      component.searchResults$.subscribe(results => {
        expect(results).toEqual(mockResults);
      });
    }));
  });

});

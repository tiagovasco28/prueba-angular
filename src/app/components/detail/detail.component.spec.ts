import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { DetailComponent } from './detail.component';
import { ApiService } from 'src/app/services/api.service';
import { NgxStarsModule } from 'ngx-stars';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  let activatedRoute: ActivatedRoute;

  beforeEach(waitForAsync(() => {
    const apiServiceSpy = jasmine.createSpyObj('ApiServiceService', ['getSerieById', 'serieResults$']);
    const activatedRouteMock = {
      snapshot: {
        params: {
          id: 1, // Mock an id for testing
        },
      },
    };

    TestBed.configureTestingModule({
      declarations: [DetailComponent],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
      imports:[NgxStarsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call apiService.getSerieById with the id from ActivatedRoute', () => {
      const fakeId = 1;
      component.ngOnInit();

      expect(apiService.getSerieById).toHaveBeenCalledWith(fakeId);
    });
  });

  // describe('should getSeries', () => {
  //   it('should set searchResults$ with the value from apiService', fakeAsync(() => {
  //     const fakeSerieResults = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
  //     apiService.serieResults$ = of(fakeSerieResults);

  //     component.getSeries();
  //     tick(); // Wait for the asynchronous operation to complete

  //     let actualResults: any;
  //     component.serieResult$.subscribe((results: any) => actualResults = results);

  //     expect(actualResults).toEqual(fakeSerieResults);
  //   }));
  // });

  describe('plainText', () => {
    it('should return plain text without HTML tags', () => {
      const htmlText = '<p>This is <b>bold</b> text.</p>';
      const plainText = component.plainText(htmlText);

      expect(plainText).toEqual('This is bold text.');
    });
  });
});

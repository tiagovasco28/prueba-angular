// Import necessary testing modules and HttpClientTestingModule
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';


describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('updateSearchResults', () => {
    it('should update searchResultsSource with filtered and sliced results', () => {
      const query = 'Show';
      const mockResults = [
        { show: { id: 1, name: 'Show 1', image: {} } },
        { show: { id: 2, name: 'Show 2', image: {} } },
        { show: { id: 3, name: 'Show 3', image: {} } },
      ];
      const expectedFilteredAndSlicedResults = [
        { show: { id: 1, name: 'Show 1', image: {} } },
        { show: { id: 2, name: 'Show 2', image: {} } },
        { show: { id: 3, name: 'Show 3', image: {} } },
      ];
      
      const result$ = service.searchResults$;
      service.updateSearchResults(mockResults, query);
  
      result$.subscribe(result => {
        expect(result).toEqual(expectedFilteredAndSlicedResults);
        expect(result.length).toBe(expectedFilteredAndSlicedResults.length)
      });
    });
  });
  

    describe('updateSerieResult', () => {
      it('should update serieSource with the provided result', () => {
        const mockResult = [{ show: { id: 1, name: 'Show 1', image: {} } }];
        const result$ = service.serieResults$;

        service.updateSerieResult(mockResult);
        result$.subscribe(result => {
          expect(result).toEqual(mockResult);
        });
      });
    });

    describe('getSerieById', () => {
      it('should return the correct series by ID', () => {
        // Mock data
        const mockList = [
          { show: { id: 1, name: 'Series 1' } },
          { show: { id: 2, name: 'Series 2' } },
          { show: { id: 3, name: 'Series 3' } }
        ];
  
        // Set the mock data in the service
        service['searchResultsSource'].next(mockList);
  
        // Call the method with a specific ID
        const result = service.getSerieById(2);
  
        // Expect the result to be the correct series
        expect(result).toEqual({ show: { id: 2, name: 'Series 2' } });
      });
  
      it('should return undefined for non-existent ID', () => {
        // Mock data
        const mockList = [
          { show: { id: 1, name: 'Series 1' } },
          { show: { id: 3, name: 'Series 3' } }
        ];
  
        // Set the mock data in the service
        service['searchResultsSource'].next(mockList);
  
        // Call the method with a non-existent ID
        const result = service.getSerieById(2);
  
        // Expect the result to be undefined
        expect(result).toBeUndefined();
      });
    });
    


  });


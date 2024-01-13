// Import necessary testing modules and HttpClientTestingModule
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { Serie } from '../interfaces/ISerie';


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
      const mockResults:Serie[] = [
        { show: { id: 1, name: 'Show 1', image: { medium: 'src/image' }, rating:{average: 5.0}, summary:'description' } },
        { show: { id: 2, name: 'Show 2', image: { medium: 'src/image' },rating:{average: 5.0}, summary:'description'  } },
        { show: { id: 3, name: 'Show 3', image: { medium: 'src/image' },rating:{average: 5.0}, summary:'description' }  },
      ];
      const expectedFilteredAndSlicedResults:Serie[] = [
        { show: { id: 1, name: 'Show 1', image: { medium: 'src/image' }, rating:{average: 5.0}, summary:'description' } },
        { show: { id: 2, name: 'Show 2', image: { medium: 'src/image' },rating:{average: 5.0}, summary:'description'  } },
        { show: { id: 3, name: 'Show 3', image: { medium: 'src/image' },rating:{average: 5.0}, summary:'description' }  },
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
        const mockResult:Serie[] = [ { show: { id: 1, name: 'Show 1', image: { medium: 'src/image' }, rating:{average: 5.0}, summary:'description' } }];
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
        const mockList:Serie[] = [
          { show: { id: 1, name: 'Show 1', image: { medium: 'src/image' }, rating:{average: 5.0}, summary:'description' } },
          { show: { id: 2, name: 'Show 2', image: { medium: 'src/image' },rating:{average: 5.0}, summary:'description'  } },
          { show: { id: 3, name: 'Show 3', image: { medium: 'src/image' },rating:{average: 5.0}, summary:'description' }  },
        ];
  
        // Set the mock data in the service
        service['searchResultsSource'].next(mockList);
  
        // Call the method with a specific ID
        const result = service.getSerieById(2);
  
        // Expect the result to be the correct series
        expect(result).toEqual({ show: { id: 2, name: 'Show 2', image: { medium: 'src/image' },rating:{average: 5.0}, summary:'description'  } });
      });
  
      it('should return undefined for non-existent ID', () => {
        // Mock data
        const mockList:Serie[] = [
          { show: { id: 1, name: 'Show 1', image: { medium: 'src/image' }, rating:{average: 5.0}, summary:'description' } },
          { show: { id: 3, name: 'Show 3', image: { medium: 'src/image' },rating:{average: 5.0}, summary:'description' }  },
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


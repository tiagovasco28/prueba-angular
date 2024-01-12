import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'https://api.tvmaze.com/search/shows?q='; // URL to web api
  private searchResultsSource = new BehaviorSubject<any[]>([]);
  private serieSource = new BehaviorSubject<any[]>([]);
  searchResults$ = this.searchResultsSource.asObservable();
  serieResults$ = this.serieSource.asObservable();

  constructor(private http: HttpClient) { }

  updateSearchResults(results: any[], query: string) {
    // Filtrar elementos sin show.image
    const filteredResults = results.filter(result => result.show && result.show.image);

    const queryResults = filteredResults.filter(result => result.show.name.includes(query));

    const finalResults = queryResults.slice(0, 6);

    this.searchResultsSource.next(finalResults);
  }

  updateSerieResult(result: any) {
    this.serieSource.next(result);
  }

  getData(query: string) {
    return this.http.get(this.url + query).pipe(
      tap((resp: any) => this.updateSearchResults(resp, query)),
    );

  }

  getSerieById(id: number): Observable<any> {
    return this.searchResults$.pipe(
      tap(list => {
        const result = list.filter(item => item.show.id === id);
        this.updateSerieResult(result);
      })
    );
  }

}

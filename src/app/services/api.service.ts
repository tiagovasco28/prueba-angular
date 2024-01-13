import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map, of, tap } from 'rxjs';
import { Serie } from '../interfaces/ISerie';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'https://api.tvmaze.com/search/shows?q='; // URL to web api
  private searchResultsSource = new BehaviorSubject<Serie[]>([]);
  private serieSource = new BehaviorSubject<Serie[]>([]);
  searchResults$ = this.searchResultsSource.asObservable();
  serieResults$ = this.serieSource.asObservable();

  constructor(private http: HttpClient) { }

  updateSearchResults(results: Serie[], query: string) {
    // Filtrar elementos sin show.image
    const filteredResults = results.filter(result => result.show && result.show.image);

    const queryResults = filteredResults.filter(result => result.show.name.includes(query));

    const finalResults = queryResults.slice(0, 6);

    this.searchResultsSource.next(finalResults);
  }

  updateSerieResult(result: Serie[]) {
    this.serieSource.next(result);
  }

  getData(query: string) {
    return this.http.get(this.url + query).pipe(
      tap((resp: any) => this.updateSearchResults(resp, query)),
    );

  }

  getSerieById(id: number): any {
    const list = this.searchResultsSource.getValue();
    const result = list.find(item => item.show.id === id);
    return result;
  }


}

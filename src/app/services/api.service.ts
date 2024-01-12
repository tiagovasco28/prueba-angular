import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'https://api.tvmaze.com/search/shows?q='; // URL to web api
  private searchResultsSource = new BehaviorSubject<any[]>([]);
  searchResults$ = this.searchResultsSource.asObservable();


  constructor(private http: HttpClient) { }

  updateSearchResults(results: any[], query: string) {

    const filteredResults = results.filter(result => result.show && result.show.image);
    const queryResults = filteredResults.filter(result => result.show.name.includes(query));
    const finalResults = queryResults.slice(0, 6);

    this.searchResultsSource.next(finalResults);
  }

  getData(query: string) {
    return this.http.get(this.url + query).pipe(
      tap((resp: any) => this.updateSearchResults(resp, query)),
    );
  }

}


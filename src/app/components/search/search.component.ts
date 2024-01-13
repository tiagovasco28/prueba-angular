import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, switchMap, debounceTime } from 'rxjs';
import { Serie } from 'src/app/interfaces/ISerie';
import {  ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl();
  searchResults$!: Observable<Serie>;


  constructor(private apiService:ApiService) {}

  ngOnInit(): void {
    this.searchResults$ = this.searchControl.valueChanges.pipe(
      debounceTime(500), // Espera 500 ms después de que el usuario deja de escribir
      switchMap(resp =>{
        return this.apiService.getData(resp)
      })
    )

  }


}

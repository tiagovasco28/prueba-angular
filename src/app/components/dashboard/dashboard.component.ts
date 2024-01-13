import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import {Serie} from  '../../interfaces/ISerie'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  searchResults$!:  Observable<Serie[]>;

  constructor(private apiService: ApiService, private router: Router) {}
  ngOnInit(): void {
    this.getSeries();
  }

  getSeries() {
    return (this.searchResults$ = this.apiService.searchResults$);
  }

  goToDetail(id:number): void {
    this.router.navigate(['/detail', id]);
  }
}

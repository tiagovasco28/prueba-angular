import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Serie } from 'src/app/interfaces/ISerie';

import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  serieResult$!: Serie;
  ratingValue: number = 10;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router:Router) { }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'F5') {
      this.router.navigate(['/']);
    }
  }

  @HostListener('window:load', ['$event'])
  onLoad(event: Event) {
    this.router.navigate(['/']);
  }


  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.serieResult$ = this.apiService.getSerieById(id);
  }

  plainText(htmlText: string): string {

    return htmlText.replace(/<[^>]*>/g, '');
  }
}

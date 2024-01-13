import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  serieResult$: any;
  ratingValue: number = 10;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.serieResult$ = this.apiService.getSerieById(id);
  }

  plainText(htmlText: string): string {

    return htmlText.replace(/<[^>]*>/g, '');
  }
}

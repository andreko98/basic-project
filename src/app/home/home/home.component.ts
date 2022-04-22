import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'database/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  preserveWhitespaces: true
})

export class HomeComponent implements OnInit {
  dealerships: any;
  
  constructor(private databaseService: DatabaseService) 
  { }

  ngOnInit(): void {
    this.dealerships = this.databaseService.getCollection("dealership");
  }
}
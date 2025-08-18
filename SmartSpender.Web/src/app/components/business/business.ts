import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../services/business.service';
import { BusinessDto } from '../../dtos/business.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-business',
  templateUrl: './business.html',
  styleUrls: ['./business.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class BusinessComponent implements OnInit {
  businesses: BusinessDto[] = [];

  constructor(private businessService: BusinessService) {}

  ngOnInit(): void {
    this.businessService.getBusinesses().subscribe((data) => {
      this.businesses = data;
    });
  }
}

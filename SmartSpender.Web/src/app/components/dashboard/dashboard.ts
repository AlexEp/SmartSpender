import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ChartsComponent } from '../charts/charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatTabsModule, ChartsComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent {

}

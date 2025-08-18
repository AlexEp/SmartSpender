import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar {

}

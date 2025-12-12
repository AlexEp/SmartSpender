import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, Navbar],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {

}

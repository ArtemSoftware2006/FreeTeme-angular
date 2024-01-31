import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],
  imports: [CommonModule, RouterOutlet, MainHeaderComponent, MainFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'hakaton_angular';
}

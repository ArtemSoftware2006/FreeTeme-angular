import { Component, HostListener } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { LinkComponent } from '../UI/link/link.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [ProfileComponent, LinkComponent, MatSidenavModule, MatIconModule, MatButtonModule, NgClass],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss'
})
export class MainHeaderComponent {
  isOpenMenu = false;
  isSmallScreen = false;
  constructor() {
      this.getScreenSize();
  }
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
      this.isSmallScreen = window.screen.width < 768;
  }

  toggleSidenav() {
    this.isOpenMenu = !this.isOpenMenu;
  }
}

import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { Category } from '../../../../models/category';

@Component({
  selector: 'app-categories-panel',
  standalone: true,
  imports: [MatChipsModule, NgFor],
  templateUrl: './categories-panel.component.html',
  styleUrl: './categories-panel.component.scss'
})
export class CategoriesPanelComponent {
  @Input() categories? : Category[];
} 



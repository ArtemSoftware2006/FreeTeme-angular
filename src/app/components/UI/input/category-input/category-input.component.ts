import { SelectedCategory } from './../../../../models/category';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryService } from '../../../../services/category/category.service';
import { Category } from '../../../../models/category';
import {MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-category-input',
  standalone: true,
  imports: [MatChipsModule, MatFormFieldModule, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './category-input.component.html',
  styleUrl: './category-input.component.scss'
})
export class CategoryInputComponent {

  categories? : Category[];
  @Input() selectedCategories : SelectedCategory[] = [];
  @Output() toggleSelectionEvent = new EventEmitter<SelectedCategory>();
  constructor(public categoryService : CategoryService) 
  { }

  ngOnInit(): void {
    this.categoryService.getCategories()
    .then(categories => {
      this.categories = categories

      this.selectedCategories = this.categories.map(category => {
        if (!this.selectedCategories.find(x => x.id === category.id)) {
          return {id: category.id, name: category.name, isSelected: false};
        }
        return {...category, isSelected: true};
      });
    })
    .catch(err => console.log(err))
  }

  toggleSelection(category: SelectedCategory) {
    category.isSelected = !category.isSelected;
    this.toggleSelectionEvent.emit(category);
  }
}
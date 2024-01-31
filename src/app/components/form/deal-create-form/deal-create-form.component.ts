import { NotificationService } from './../../../services/notification/notification.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInputComponent } from './../../UI/input/form-input/form-input.component';
import { Component, EventEmitter, Output } from '@angular/core';
import { PrimaryButtonComponent } from '../../UI/button/primary-button/primary-button.component';
import { DealService } from '../../../services/deal/deal.service';
import { AuthorizationService } from '../../../services/authorization/authorization.service';
import { DealCreate } from '../../../models/deal';
import { User } from '../../../models/user';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { CategoryInputComponent } from '../../UI/input/category-input/category-input.component';
import { SelectedCategory } from '../../../models/category';
import { priceRangeValidator } from '../../../services/validators/price-range-validator';

@Component({
  selector: 'app-deal-create-form',
  standalone: true,
  imports: [FormInputComponent, ReactiveFormsModule, PrimaryButtonComponent, CategoryInputComponent, NgIf],
  templateUrl: './deal-create-form.component.html',
  styleUrl: './deal-create-form.component.scss'
})
export class DealCreateFormComponent {
  @Output() submitEvent : EventEmitter<boolean> = new EventEmitter();
  dealCreateForm! : FormGroup; // Добавь типизацию формы + не забывай ; в конце строк
  user? : User | null;
  selectedCategories : number[] = [];
  constructor (public builder : FormBuilder,
    public dealService : DealService,
    public authService : AuthorizationService,
    public router : Router,
    public notificationService : NotificationService) { }

  ngOnInit(): void {
    // Если ты используешь для работы с формами FormBuilder, то используй его и для создания контролов, смешивать не стоит
    // Можно вынести Validators.required, Validators.minLength(3), Validators.maxLength(255) в отдельные переменные и использовать их везде (например в данном случае это может быть appTextValidRules)
    this.dealCreateForm = this.builder.nonNullable.group({
      title : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      description : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(2000)]),
      minPrice : new FormControl('', [Validators.required, Validators.min(0), Validators.max(1000000)]),
      maxPrice : new FormControl('', [Validators.required, Validators.min(0), Validators.max(1000000)]),
      location : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      date : new FormControl('', [Validators.required]),
    },
    {
      validators : [priceRangeValidator]
    });


    this.authService.getUser().subscribe(user => {
      this.user = user
    })
  }

  onSubmit() {
    console.log(this.dealCreateForm.errors);
    if (this.user == null || this.dealCreateForm.invalid) {

      this.submitEvent.emit(false);
      return
    }

    const deal : DealCreate = {
      ...this.dealCreateForm.value,
      userId : this.user.id,
      categoryIds : this.selectedCategories
    };

    this.dealService.create(deal)
    .subscribe(() => {
      this.submitEvent.emit(true);
      this.router.navigate(['/home']);
    },
    error => {
      this.submitEvent.emit(false);
      console.log(error);
      this.notificationService.showError(error.error, 'Error');
    });
  }

  toggleCategory($event: SelectedCategory) {
    const category = this.selectedCategories.find(x => x == $event.id);

    if (category) {
      if (!$event.isSelected) {
        this.selectedCategories = this.selectedCategories.filter(x => x != $event.id);
      }
    } else {
      if ($event.isSelected) {
        this.selectedCategories.push($event.id); 
      }      
    }
  }
}

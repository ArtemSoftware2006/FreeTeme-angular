import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FormInputComponent } from '../../UI/input/form-input/form-input.component';
import { AuthorizationService } from '../../../services/authorization/authorization.service';
import { ProposalService } from '../../../services/proposal/proposal.service';
import { CreateProposal } from '../../../models/proposal';
import { User } from '../../../models/user';

@Component({
  selector: 'app-proposal-creaete-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, FormInputComponent, NgIf],
  templateUrl: './proposal-creaete-form.component.html',
  styleUrl: './proposal-creaete-form.component.scss'
})
export class ProposalCreaeteFormComponent {

  @Input() hidden = false;
  @Input() dealId? : number;
  @Output() onProposalCreated = new EventEmitter<boolean>();
  user? : User; 
  proposalForm : FormGroup = new FormGroup({});

  constructor(public formBuilder : FormBuilder,
    public authService : AuthorizationService,
    public proposalService : ProposalService) { }

  ngOnInit(): void {
    this.proposalForm = this.formBuilder.group({
        description : new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]),
        price : new FormControl('', [Validators.required, Validators.min(0), Validators.max(1000000)]),
    });

    this.authService.getUser().subscribe(user => {
      this.user = user as User;
    })
  }

  onSubmit() {
    if (this.proposalForm.valid ) {

      if (this.dealId == null) {
        console.error("dealId is null");
      }

      const proposal : CreateProposal = {
        userId : this.user?.id as number,
        description : this.proposalForm.controls["description"].value as string,
        price : this.proposalForm.controls["price"].value as number,
        dealId : this.dealId as number
      };

      this.proposalService.create(proposal)
      .subscribe(() => {
        this.onProposalCreated.emit(true);
      },
      error => {
        console.error(error);
        this.onProposalCreated.emit(false);
      })
    }
  }
}

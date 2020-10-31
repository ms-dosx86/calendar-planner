import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Plan } from 'src/app/models/plan';
import { PlanInterval } from 'src/app/models/plan-interval';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPlanComponent implements OnInit {

  readonly form = this.formBuilder.group({
    name: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
  });

  @Output()
  added = new EventEmitter<Plan>();

  constructor(
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid) {
      const form = this.form.value;
      const interval = new PlanInterval(form.startDate, form.endDate);
      const plan = new Plan(form.name, interval);
      this.added.emit(plan);
    }
  }
}

import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Plan } from 'src/app/models/plan';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanComponent implements OnInit {

  @Input()
  plan: Plan;

  constructor() { }

  ngOnInit(): void {
  }

}

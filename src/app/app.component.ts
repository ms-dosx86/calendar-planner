import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Plan } from './models/plan';
import { map, scan, shareReplay, startWith, tap, withLatestFrom } from 'rxjs/operators';
import { PlanInterval } from './models/plan-interval';

let SAVED_PLANS: Plan[] = JSON.parse(localStorage.getItem('plans')) ?? [];
SAVED_PLANS = SAVED_PLANS.map(rawPlan => new Plan(
  rawPlan.name,
  new PlanInterval(new Date(rawPlan.interval.dateFrom), new Date(rawPlan.interval.dateTo))
));

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly planAdded$ = new Subject<Plan>();
  private readonly algorithm$ = new Subject<void>();

  readonly plans$ = this.planAdded$
    .pipe(
      scan((plans, plan) => [...plans, plan], SAVED_PLANS),
      tap(plans => localStorage.setItem('plans', JSON.stringify(plans))),
      startWith(SAVED_PLANS),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

  readonly algorithmed$ = this.algorithm$
    .pipe(
      withLatestFrom(this.plans$),
      map(([, plans]) => [...plans]),
      map((plans) => {
        const sorted = [];
        while (plans.length > 0) {
          let min = plans[0];
          let minI = 0;
          for (let i = 0; i < plans.length; i++) {
            if (plans[i].interval.dateTo < min.interval.dateTo) {
              min = plans[i];
              minI = i;
            }
          }

          sorted.push(min);
          plans.splice(minI, 1);

          for (let i = 0; i < plans.length; i++) {
            if (min.overlaps(plans[i])) {
              plans.splice(i, 1);
              i--;
            }
          }
        }
        return sorted;
      })
    );

  trackByNameFn(_: number, plan: Plan) {
    return plan.name;
  }

  onPlanAdded(plan: Plan) {
    this.planAdded$.next(plan);
  }

  clearPlans() {
    localStorage.removeItem('plans');
  }

  algorithm() {
    this.algorithm$.next();
  }
}

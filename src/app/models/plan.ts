import { PlanInterval } from './plan-interval';

export class Plan {
  constructor(
    public name: string,
    public interval: PlanInterval,
  ) { }

  overlaps(plan: Plan) {
    return this.interval.contains(plan.interval.dateFrom)
      || this.interval.contains(plan.interval.dateTo)
      || plan.interval.contains(this.interval.dateFrom)
      || plan.interval.contains(this.interval.dateTo);
  }
}

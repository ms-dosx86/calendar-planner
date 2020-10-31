export class PlanInterval {
  private formatted: string;
  constructor(
    public dateFrom: Date,
    public dateTo: Date,
  ) {
    this.formatted = `${this.formatDate(dateFrom)} - ${this.formatDate(dateTo)}`;
  }

  private formatDate(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  toString() {
    if (!this.formatted) {
      this.formatted = `${this.formatDate(this.dateFrom)} - ${this.formatDate(this.dateTo)}`;
    }
    return this.formatted;
  }

  contains(date: Date) {
    return date >= this.dateFrom && date <= this.dateTo;
  }
}

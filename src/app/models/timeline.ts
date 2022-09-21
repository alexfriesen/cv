export class Timeline {
  public headline = 'New Timeline';
  public items = [];

  constructor(data?) {
    if (!data) return this;

    this.headline = data.headline;
    this.items = data.items || [];
  }

}

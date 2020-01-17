export class Text {
  public headline = 'New Text Item';
  public description = '';

  constructor(data?) {
    if (!data) return this;

    this.headline = data.headline;
    this.description = data.description;
  }

}

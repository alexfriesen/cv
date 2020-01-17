export class Image {

  public style = 'circle';
  public image = '';

  constructor(data?) {
    if (!data) return this;

    this.style = data.style;
    this.image = data.image;
  }

}

export class Theme {

  highlightColor = '#3f51b5';

  headlineColor = '#666';
  headlineFontType = 'Source Sans Pro';
  headlineFontSize = '1.6em';
  headlineFontWeight = '600';

  headlineBorderType = 'dashed';

  textColor = '#666';
  textFontType = 'Roboto';
  textFontSize = '1em';
  textFontWeight = '200';

  constructor(data?) {
    if (!data) return this;

    this.highlightColor = data.highlightColor;

    this.headlineColor = data.headlineColor;
    this.headlineFontType = data.headlineFontType;
    this.headlineFontSize = data.headlineFontSize;
    this.headlineFontWeight = data.headlineFontWeight;

    this.headlineBorderType = data.headlineBorderType;

    this.textColor = data.textColor;
    this.textFontType = data.textFontType;
    this.textFontSize = data.textFontSize;
    this.textFontWeight = data.textFontWeight;
  }

}

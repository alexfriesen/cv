

export interface Theme {
  highlightColor: string;

  headlineColor: string;
  headlineFontType: string;
  headlineFontSize: string;
  headlineFontWeight: string;

  headlineBorderType: string;

  textColor: string;
  textFontType: string;
  textFontSize: string;
  textFontWeight: string;
}

export const defaultTheme: Theme = {
  highlightColor: '#3f51b5',

  headlineColor: '#95A5A6',
  headlineFontType: 'Roboto',
  headlineFontSize: '1.8em',
  headlineFontWeight: '600',

  headlineBorderType: 'dashed',

  textColor: '#333',
  textFontType: 'Source Sans Pro',
  textFontSize: '1em',
  textFontWeight: '200',
};

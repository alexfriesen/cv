export enum ContentType {
  text = 'text',
  image = 'image',
  timeline = 'timeline'
}

export interface Content<T = any> {
  id: string;
  type: ContentType;
  height?: number;
  data: T;
}

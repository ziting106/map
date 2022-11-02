export class DialogDataDef {
  constructor() {}

  type?: 'edit' | 'Del' | 'MSG' = 'MSG';
  title?: string = '';
  model?: any = '';
  msg?: string = '';
  sys?: string = '';
}

import { CodeName } from '../util/con-type.interface';
export interface MenuNode {
  ItemNo?: string;
  Name: string;
  Icon: string;
  Link: string;
  Functions?: CodeName[];
  Children?: MenuNode[];
  action?: {
    id: string;
    type: string;
    src?: string;
    title: string;
  };
}

import { RerollInterface } from 'interfaces/reroll';
import { OrganizationInterface } from 'interfaces/organization';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TodoInterface {
  id?: string;
  task: string;
  hyperlink: string;
  organization_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  reroll?: RerollInterface[];
  organization?: OrganizationInterface;
  user?: UserInterface;
  _count?: {
    reroll?: number;
  };
}

export interface TodoGetQueryInterface extends GetQueryInterface {
  id?: string;
  task?: string;
  hyperlink?: string;
  organization_id?: string;
  user_id?: string;
}

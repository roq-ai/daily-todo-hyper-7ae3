import { UserInterface } from 'interfaces/user';
import { TodoInterface } from 'interfaces/todo';
import { GetQueryInterface } from 'interfaces';

export interface RerollInterface {
  id?: string;
  reroll_count: number;
  user_id?: string;
  todo_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  todo?: TodoInterface;
  _count?: {};
}

export interface RerollGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  todo_id?: string;
}

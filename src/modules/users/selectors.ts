import { RootState } from 'modules/reducers';
import { UserState } from './types';

export const getUsers = (state: RootState): UserState => state.users;

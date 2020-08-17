import React, { FC } from 'react';

import useFetch from './useFetch';

type User = Readonly<{
  id: number;
  name: string;
}>;

const UserList: FC = () => {
  const users = useFetch<User>('/users');

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UserList;

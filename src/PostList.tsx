import React, { FC } from 'react';

import useFetch from './useFetch';

type Post = Readonly<{
  id: number;
  title: string;
}>;

const PostList: FC = () => {
  const posts = useFetch<Post>('/posts');

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};

export default PostList;

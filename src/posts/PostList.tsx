import React, { FC, useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import axios from 'axios';

import { Post } from './types/Post';

const PostList: FC = () => {
  const { path } = useRouteMatch();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get<Post[]>('/posts');

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link to={`${path}/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default PostList;

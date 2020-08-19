import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Post } from './types/Post';

const PostItem: FC = () => {
  const [post, setPost] = useState<Post>();
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await axios.get<Post>(`/posts/${id}`);

      setPost(data);
    };

    fetchPost();
  }, [id]);

  return (
    <dl>
      <dt>ID</dt>
      <dd>{post?.id}</dd>
      <dt>Title</dt>
      <dd>{post?.title}</dd>
      <dt>Body</dt>
      <dd>{post?.body}</dd>
    </dl>
  );
};

export default PostItem;

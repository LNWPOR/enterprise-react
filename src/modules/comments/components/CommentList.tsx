import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';

import { Comment } from '../types';

type Props = {
  postId: string;
};

const CommentList: FC<Props> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(`/comments?postId=${postId}`);

      setComments(res.data);
    };

    fetchComments();
  }, [postId]);

  return (
    <>
      <div>Comments</div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.body}</li>
        ))}
      </ul>
    </>
  );
};

export default CommentList;

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Button } from '@mui/material';
import FlexColumnDiv from '../Components/FlexColumnDiv';
import { getTelegramPostsByUserId } from '../API/AdminApi';
import PostBlock from '../Components/PostBlock';

function AdminPostsPage() {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getTelegramPostsByUserId(userId).then(({ data }) => {
      setPosts(data);
    });
  }, []);

  const deletePostById = (postId) => setPosts(posts.filter((post) => post._id !== postId));

  return (
    <FlexColumnDiv>
      <Link to="/admin"><Button>Go back</Button></Link>
      Posts:
      <FlexColumnDiv>
        {posts.map((post) => <PostBlock onDelete={deletePostById} post={post} />)}
      </FlexColumnDiv>
    </FlexColumnDiv>
  );
}

export default AdminPostsPage;

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Button } from '@mui/material';
import styled from '@emotion/styled';
import FlexColumnDiv from '../Components/FlexColumnDiv';
import { getTelegramPostsByUserId } from '../API/AdminApi';
import PostBlock from '../Components/PostBlock';
import FlexColumnDiv100 from '../Components/FlexColumnDiv100';

const PostsDiv = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 600px;
  padding: 15px;
  gap: 15px;
  margin: 0 auto;
`;

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
    <FlexColumnDiv100>
      <Link to="/admin"><Button>Go back</Button></Link>
      <FlexColumnDiv>
        Posts:
        <PostsDiv>
          {posts.map((post) => (
            <PostBlock onDelete={deletePostById} post={post} />
          ))}
        </PostsDiv>
      </FlexColumnDiv>
    </FlexColumnDiv100>
  );
}

export default AdminPostsPage;

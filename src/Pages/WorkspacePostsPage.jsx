import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import FlexColumnDiv100 from '../Components/FlexColumnDiv100';
import ResponsiveAppBar from '../Components/ResponsiveAppBar';
import { getTelegramPosts } from '../API/WorkspaceApi';
import PostBlock from '../Components/PostBlock';

const PostsDiv = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 600px;
  padding: 15px;
  gap: 15px;
  margin: 0 auto;
`;

function WorkspacePostsPage() {
  const [posts, setPosts] = useState([]);

  const deletePostById = (postId) => setPosts(posts.filter((post) => post._id !== postId));

  useEffect(() => {
    getTelegramPosts()
      .then(({ data }) => setPosts(data));
  }, []);
  return (
    <FlexColumnDiv100>
      <ResponsiveAppBar />
      <PostsDiv>
        {posts.map((post) => (
          <PostBlock onDelete={deletePostById} post={post} />
        ))}
      </PostsDiv>
    </FlexColumnDiv100>
  );
}

export default WorkspacePostsPage;

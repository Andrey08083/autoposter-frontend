import React, { useEffect, useState } from 'react';
import FlexColumnDiv from '../Components/FlexColumnDiv';
import FlexColumnDiv100 from '../Components/FlexColumnDiv100';
import ResponsiveAppBar from '../Components/ResponsiveAppBar';
import { getTelegramPosts } from '../API/WorkspaceApi';
import PostBlock from '../Components/PostBlock';

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
      <FlexColumnDiv>
        {posts.map((post) => (
          <PostBlock onDelete={deletePostById} post={post} />
        ))}
      </FlexColumnDiv>
    </FlexColumnDiv100>
  );
}

export default WorkspacePostsPage;

import React, { useEffect, useState } from 'react';
import FlexColumnDiv from '../Components/FlexColumnDiv';
import FlexColumnDiv100 from '../Components/FlexColumnDiv100';
import ResponsiveAppBar from '../Components/ResponsiveAppBar';
import { getTelegramPosts } from '../API/WorkspaceApi';
import PostBlock from '../Components/PostBlock';

function WorkspacePostsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getTelegramPosts()
      .then(({ data }) => setPosts(data));
  }, []);
  return (
    <FlexColumnDiv100>
      <ResponsiveAppBar />
      <FlexColumnDiv>
        {posts.map((post) => (
          <PostBlock post={post} />
        ))}
      </FlexColumnDiv>
    </FlexColumnDiv100>
  );
}

export default WorkspacePostsPage;

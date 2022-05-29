import React from 'react';
import styled from '@emotion/styled';

const FlexPostDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  border: 1px solid rgb(0, 0, 0);
`;

function PostBlock({ post }) {
  return (
    <FlexPostDiv>
      <p>Channel name: {post.title}</p>
      <p>Status: {post.status}</p>
      <p>Post text:</p>

      <div dangerouslySetInnerHTML={{ __html: post.text.replace(/\n/g, '<br>') }} />
    </FlexPostDiv>
  );
}

export default PostBlock;

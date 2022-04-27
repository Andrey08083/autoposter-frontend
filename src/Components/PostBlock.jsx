import React from 'react';
import styled from '@emotion/styled';

const FlexPostDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid rgb(0, 0, 0);
`;

function PostBlock({ channel }) {
  return (
    <FlexPostDiv>
      <p>Channel name: {channel.title}</p>

      <p>Post text: {channel.text}</p>
    </FlexPostDiv>
  );
}

export default PostBlock;

import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import FlexRowDiv from './FlexRowDiv';
import { deleteTelegramPostById, sendTelegramPostById } from '../API/WorkspaceApi';

const FlexPostDiv = styled.div`
  padding: 20px;
  min-width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  border: 1px solid rgb(0, 0, 0);
`;

function PostBlock({ post, onDelete }) {
  return (
    <FlexPostDiv>
      <p>Channel name: {post.title}</p>
      <p>Status: {post.status}</p>
      <p>Post text:</p>

      <div dangerouslySetInnerHTML={{ __html: post.text.replace(/\n/g, '<br>') }} />
      <FlexRowDiv>
        <Button onClick={() => { sendTelegramPostById(post._id); }}>
          Send post now
        </Button>
        <Button onClick={() => {
          deleteTelegramPostById(post._id).then(() => onDelete(post._id));
        }}
        >Delete post
        </Button>
      </FlexRowDiv>
    </FlexPostDiv>
  );
}

export default PostBlock;

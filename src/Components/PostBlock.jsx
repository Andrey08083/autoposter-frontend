import React from 'react';
import styled from '@emotion/styled';
import { Button, IconButton } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HelpIcon from '@mui/icons-material/Help';
import TelegramIcon from '@mui/icons-material/Telegram';
import DeleteIcon from '@mui/icons-material/Delete';

import { deleteTelegramPostById, sendTelegramPostById } from '../API/WorkspaceApi';

const FlexPostDiv = styled.div`
  min-width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  text-align: left;
  background-color: #F1F1F1;
  border-radius: 15px;
  border: 1px solid #e7e7e7;
`;

const PostHead = styled.div`
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  gap: 15px;
  text-align: left;
  align-items: center;
  border-bottom: 1px solid #c4c4c4;
`;

const PostDiv = styled.div`
  padding: 15px;
  box-sizing: border-box;
  line-height: 21px;
  border-bottom: 1px solid #c4c4c4;
`;

const ChannelImg = styled.img`
  width: 50px;
  border-radius: 50%;
`;

const PostStatus = styled.div`
  margin-left: auto;
`;

const ButtonsDiv = styled.div`
  display: flex;
  padding: 15px;
  justify-content: space-between;
`;

const resolveIcon = (status) => {
  switch (status) {
    case 'Sent': return (<CheckCircleIcon color="success" />);
    case 'Pending': return (<PendingIcon color="primary" />);
    case 'Error': return (<ErrorIcon color="error" />);
    default: return (<HelpIcon color="warning" />);
  }
};

function PostBlock({ post, onDelete }) {
  return (
    <FlexPostDiv>
      <PostHead>
        <ChannelImg src={`data:image/png;base64, ${post.channelPhoto}`} />
        {post.title}
        <PostStatus>{resolveIcon(post.status)}</PostStatus>
      </PostHead>
      <PostDiv dangerouslySetInnerHTML={{ __html: post.text.replace(/\n/g, '<br>') }} />
      <ButtonsDiv>
        <Button
          onClick={() => { sendTelegramPostById(post._id); }}
          variant="outlined"
          endIcon={<TelegramIcon />}
        >
          Send post now
        </Button>
        <IconButton
          onClick={() => {
            deleteTelegramPostById(post._id).then(() => onDelete(post._id));
          }}
          color="error"
        >
          <DeleteIcon color="error" />
        </IconButton>
      </ButtonsDiv>
    </FlexPostDiv>
  );
}

export default PostBlock;

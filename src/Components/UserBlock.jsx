import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ChangePasswordDialog from './ChangePasswordDialog';
import FlexRowDiv from './FlexRowDiv';

const FlexUserDiv = styled.div`
  min-width: 30%;
  padding: 15px;
  display: flex;
  gap: 15px;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  text-align: left;
  background-color: #F1F1F1;
  border-radius: 15px;
  border: 1px solid #e7e7e7;
`;

const UserImg = styled.img`
  width: 50px;
  border-radius: 50%;
`;

const TextSpan = styled.span`
  color: #969696;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

function UserBlock({ user }) {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  return (
    <FlexUserDiv>
      <FlexRowDiv>
        <UserImg src={`data:image/png;base64, ${user.photo}`} />
        <span><strong>{user.email}</strong></span>
      </FlexRowDiv>
      <span><TextSpan>ID:</TextSpan> {user._id}</span>
      <span><TextSpan>Username:</TextSpan> {user.userName}</span>

      <Link to={`/admin/${user._id}/posts`}>
        <StyledButton variant="contained">View posts</StyledButton>
      </Link>
      <StyledButton onClick={handleOpenDialog} variant="outlined">Change password</StyledButton>
      <ChangePasswordDialog
        open={open}
        user={user}
        onClose={handleCloseDialog}
      />
    </FlexUserDiv>
  );
}

export default UserBlock;

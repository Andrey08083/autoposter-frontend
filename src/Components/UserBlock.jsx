import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ChangePasswordDialog from './ChangePasswordDialog';

const FlexUserDiv = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid rgb(0, 0, 0);
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
      <p>ID: {user._id}</p>
      <p>Email: {user.email}</p>
      <p>Username: {user.userName}</p>

      <Link to={`/admin/${user._id}/posts`}><Button>View posts</Button></Link>
      <Button onClick={handleOpenDialog}>Change password</Button>
      <ChangePasswordDialog
        open={open}
        user={user}
        onClose={handleCloseDialog}
      />
    </FlexUserDiv>
  );
}

export default UserBlock;

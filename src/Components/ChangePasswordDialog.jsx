import React, { useState } from 'react';
import { Button, Dialog, TextField } from '@mui/material';
import { handleTextChange } from '../Utils/HookChangeHandlers';
import ErrorParagraph from './ErrorParagraph';
import { updateUserPassword } from '../API/AdminApi';
import DialogDiv from './DialogDiv';

function ChangePasswordDialog({ open, onClose, user }) {
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState(undefined);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogDiv>
        <TextField label="New password" value={password} onChange={handleTextChange(setPassword)} />

        {validationErrors instanceof Array
        && validationErrors.length > 0
        && validationErrors.map((error) => <ErrorParagraph>{error}</ErrorParagraph>)}
        <Button
          onClick={() => {
            setPassword('');
            setValidationErrors(undefined);
            onClose();
          }}
        >
          Cancel
        </Button>

        <Button onClick={() => {
          updateUserPassword(user._id, password)
            .then(() => {
              setPassword('');
              setValidationErrors(undefined);
              onClose();
            })
            .catch((error) => setValidationErrors(error.response.data.errors));
        }}
        >
          Update password
        </Button>
      </DialogDiv>
    </Dialog>
  );
}

export default ChangePasswordDialog;

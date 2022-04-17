import React, { useEffect, useState } from 'react';
import { Alert, Button } from '@mui/material';

import FlexColumnDiv100 from '../Components/FlexColumnDiv100';
import ResponsiveAppBar from '../Components/ResponsiveAppBar';
import FlexColumnDiv from '../Components/FlexColumnDiv';
import FlexColumnDefaultDiv from '../Components/FlexColumnDefaultDiv';
import { getTelegramChannelsByUserId, getTelegramConnectToken } from '../API/WorkspaceApi';

function WorkspaceSettingsPage() {
  const [channels, setChannels] = useState([]);
  const [connectToken, setConnectToken] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    getTelegramChannelsByUserId()
      .then(({ data }) => setChannels(data));

    getTelegramConnectToken()
      .then(({ data }) => setConnectToken(data.connectToken))
      .catch(() => setConnectToken(''));
  }, []);

  const handleTelegramAccountConnect = async () => {
    setShowAlert(true);
  };

  return (
    <FlexColumnDiv100>
      <ResponsiveAppBar />
      {showAlert
        && (
        <Alert
          severity={connectToken !== '' ? 'success' : 'error'}
          onClose={() => { setShowAlert(false); }}
        >
          {connectToken !== ''
            ? `Send this message to ${process.env.REACT_APP_AUTOPOSTER_BOT_USERNAME}: /connect ${connectToken}`
            : 'Some error occurred'}
        </Alert>
        )}
      <FlexColumnDiv>
        Connected channels:
        {channels.map((channel) => <FlexColumnDefaultDiv>{channel.title}</FlexColumnDefaultDiv>)}
        <Button onClick={handleTelegramAccountConnect}>Connect telegram account</Button>
      </FlexColumnDiv>
    </FlexColumnDiv100>
  );
}

export default WorkspaceSettingsPage;

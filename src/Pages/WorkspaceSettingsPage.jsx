import React, { useEffect, useState } from 'react';
import { Alert, Button } from '@mui/material';

import FlexColumnDiv100 from '../Components/FlexColumnDiv100';
import ResponsiveAppBar from '../Components/ResponsiveAppBar';
import FlexColumnDiv from '../Components/FlexColumnDiv';
import {
  getTelegramChannelsByUserId,
  getTelegramConnectToken,
  removeTelegramChannel,
} from '../API/WorkspaceApi';
import ChannelBlock from '../Components/ChannelBlock';

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

  const onChannelRemoveClickHandler = (telegramChannelId) => {
    removeTelegramChannel(telegramChannelId)
      .then(() => {
        setChannels(channels.filter(({ id }) => id !== telegramChannelId));
      });
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
        {channels.map((channel) => (
          <ChannelBlock
            channel={channel}
            onRemoveClick={onChannelRemoveClickHandler}
          />
        ))}
        <Button onClick={handleTelegramAccountConnect}>Connect telegram account</Button>
      </FlexColumnDiv>
    </FlexColumnDiv100>
  );
}

export default WorkspaceSettingsPage;

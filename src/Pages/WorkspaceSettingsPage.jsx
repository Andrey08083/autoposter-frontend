import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Alert, Button } from '@mui/material';

import FlexColumnDiv100 from '../Components/FlexColumnDiv100';
import ResponsiveAppBar from '../Components/ResponsiveAppBar';
import {
  getTelegramChannelsByUserId,
  getTelegramConnectToken,
  removeTelegramChannel,
} from '../API/WorkspaceApi';
import ChannelBlock from '../Components/ChannelBlock';

const ChannelsDiv = styled.div`
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(3, 1fr);
  padding: 0 15px;
`;

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
      Connected channels:
      <ChannelsDiv>
        {channels.map((channel) => (
          <ChannelBlock
            channel={channel}
            onRemoveClick={onChannelRemoveClickHandler}
          />
        ))}
      </ChannelsDiv>
      <Button onClick={handleTelegramAccountConnect}>Connect telegram account</Button>
    </FlexColumnDiv100>
  );
}

export default WorkspaceSettingsPage;

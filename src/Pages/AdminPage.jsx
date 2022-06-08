import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import FlexColumnDiv from '../Components/FlexColumnDiv';
import { getUsers } from '../API/AdminApi';
import UserBlock from '../Components/UserBlock';
import FlexRowDiv from '../Components/FlexRowDiv';

function AdminPage() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers().then(({ data }) => {
      setUsers(data);
    });
  }, []);
  return (
    <FlexColumnDiv>
      <Link to="/"><Button>Go back</Button></Link>
      Users:
      <FlexRowDiv>
        {users.map((user) => <UserBlock user={user} />)}
      </FlexRowDiv>
    </FlexColumnDiv>
  );
}

export default AdminPage;

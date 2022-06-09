import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import styled from '@emotion/styled';
import { getUsers } from '../API/AdminApi';
import UserBlock from '../Components/UserBlock';
import FlexColumnDiv100 from '../Components/FlexColumnDiv100';

const AdminPageDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  padding: 15px 15px;
  align-items: flex-start;
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
`;

function AdminPage() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers().then(({ data }) => {
      setUsers(data);
    });
  }, []);
  return (
    <FlexColumnDiv100>
      <Link to="/"><Button>Go back</Button></Link>
      Users:
      <AdminPageDiv>
        {users.map((user) => <UserBlock user={user} />)}
      </AdminPageDiv>
    </FlexColumnDiv100>
  );
}

export default AdminPage;

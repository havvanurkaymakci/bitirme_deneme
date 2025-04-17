import React from 'react';
import UserProfile from './UserProfile';
import { useHistory } from 'react-router-dom';

const UserProfilePage = () => {
  const history = useHistory();
  const userToken = localStorage.getItem('jwtToken'); // Token'ı localStorage'dan al

  // Eğer token yoksa login sayfasına yönlendir
  if (!userToken) {
    history.push('/login');
    return null; // Yönlendirilene kadar hiç şey render etme
  }

  return (
    <div>
      <UserProfile userToken={userToken} />
    </div>
  );
};

export default UserProfilePage;

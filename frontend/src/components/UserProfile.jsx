import { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ userToken }) => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    birth_date: '',
    age: '',
    height: '',
    weight: ''
  });

  useEffect(() => {
    // Token'ı kullanarak kullanıcı profilini getir
    if (userToken) {
      axios.get('http://127.0.0.1:8000/api/user/profile/', {
        headers: { Authorization: `Bearer ${userToken}` }
      })
      .then(response => {
        setProfile(response.data);
        setFormData(response.data);
      })
      .catch(error => {
        console.log('Error fetching user profile', error);
      });
    }
  }, [userToken]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userToken) {
      axios.put('http://127.0.0.1:8000/api/user/profile/', formData, {
        headers: { Authorization: `Bearer ${userToken}` }
      })
      .then(response => {
        setProfile(response.data);
        setIsEditing(false);
      })
      .catch(error => {
        console.log('Error updating user profile', error);
      });
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      {profile ? (
        <div>
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <label>Birth Date:</label>
              <input type="date" name="birth_date" value={formData.birth_date} onChange={handleInputChange} />
              <label>Age:</label>
              <input type="number" name="age" value={formData.age} onChange={handleInputChange} />
              <label>Height (cm):</label>
              <input type="number" name="height" value={formData.height} onChange={handleInputChange} />
              <label>Weight (kg):</label>
              <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} />
              <button type="submit">Save</button>
            </form>
          ) : (
            <div>
              <p><strong>Birth Date:</strong> {profile.birth_date}</p>
              <p><strong>Age:</strong> {profile.age}</p>
              <p><strong>Height:</strong> {profile.height} cm</p>
              <p><strong>Weight:</strong> {profile.weight} kg</p>
              <button onClick={() => setIsEditing(true)}>Edit</button>
            </div>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default UserProfile;

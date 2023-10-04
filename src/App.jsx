import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [values, setValues] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setValues(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleEdit = (valueId, updatedTitle) => {
    axios.put(`https://jsonplaceholder.typicode.com/posts/${valueId}`, { title: updatedTitle })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleDelete = (valueId) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${valueId}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      {values.map(value => (
        <div key={value.id}>
          <h2>{value.title}</h2>
          <p>{value.body}</p>
          <button onClick={() => handleEdit(value.id, 'Updated Title')}>Edit</button>
          <button onClick={() => handleDelete(value.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [values, setValues] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/todos?limit=5'
        );

        const data = await response.json();

        const updatedPosts = data.map((post) => ({
          ...post,
          isEditing: false,
        }));

        setValues(updatedPosts);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleEdit = (valueId, updatedTitle) => {
    // axios.put(`https://jsonplaceholder.typicode.com/posts/${valueId}`, { title: updatedTitle })
    //   .then(response => {
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    
  };

  const handleDelete = (valueId) => {
    setValues((prevPosts) => prevPosts.filter((post) => post.id !== valueId));
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
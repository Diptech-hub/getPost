import React, { useState, useEffect } from 'react';

function App() {
  const [values, setValues] = useState([]);
  const [input, setInput] = useState('');

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

  const handleEdit = (valueId) => {
    setValues((prevPosts) =>
      prevPosts.map((post) =>
        post.id === valueId ? { ...post, isEditing: !post.isEditing } : post
      )
    );
  };

  const handleEditChange = (e, valueId) => {
    setInput(e.target.value);

    setValues((prevPosts) =>
      prevPosts.map((post) =>
        post.id === valueId ? { ...post, title: e.target.value } : post
      )
    );
  };

  const handleDelete = (valueId) => {
    setValues((prevPosts) => prevPosts.filter((post) => post.id !== valueId));
  };

  return (
    <div>
      {values.map((post) => (
        <div style={{ border: '1px dashed', marginBottom: '5px' }} key={post.id}>
          {post.isEditing ? (
            <input
              type="text"
              value={post.title}
              onChange={(e) => handleEditChange(e, post.id)}
            />
          ) : (
            post.title
          )}
          <button onClick={() => handleEdit(post.id)}>
            {post.isEditing ? 'Save' : 'Edit'}
          </button>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
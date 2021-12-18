import React, { useState } from 'react'
import axios from 'axios';

function PostCreate() {
  const [title, setTitle] = useState('');

  const onSubmit = async(e) => {
    e.preventDefault();

    await axios.post('http://localhost:4000/posts',{
      title:title
    });

    setTitle('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label htmlFor="">Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} type="text" className="form-control" />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default PostCreate

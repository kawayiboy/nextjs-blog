
import { useState } from 'react';

const Form = ({apiUrl, onSuccess}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
  
  
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, content }),
        });
  
        if (response.ok) {
        //   alert('Form submitted successfully!');
        //   setTitle('');
        //   setContent('');

          onSuccess();
        }
      } catch (error) {
        alert('Something went wrong. Please try again later.');
      }
    };
  
    return (
        <form className="col-md-6 mx-auto" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            className="form-control"
            id="content"
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  };

  export default Form;
import React from 'react';
import './App.css';
import Spinner from './Spinner';
const baseUrl = 'https://jsonplaceholder.typicode.com/posts';

function App() {
  const [posts, setPosts] = React.useState([]);
  const [message, setMessage] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getPostsData(baseUrl);
  }, []);

  const getPostsData = async (baseUrl) => {
    try {
      const response = await fetch(baseUrl);
      const data = await response.json();
      setPosts(data);
      setIsLoading(false);
    } catch (err) {
      console.log('Failed to fetch posts data: ', err);
    }
  };

  const handleFormSubmit = () => {
    fetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify({
        title,
        body: content,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage('Post created successfully');
        const newPosts = [{ ...data }, ...posts];
        setPosts(newPosts);
        setTitle('');
        setContent('');
      })
      .catch((err) => {
        console.log(err);
        setContent(err.message);
        setError(true);
      });
  };

  return (
    <div className="App shadow-lg">
      <main className="container post-content">
        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}
        <h1 className="text-center mt-2">Quick Post Creator</h1>
        <div className="row">
          <div className=" form-group col-lg-12 mb-4">
            <label htmlFor="title" className="form-label">
              Post title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className=" form-group col-lg-12 mb-4">
            <label htmlFor="content" className="form-label">
              Content
            </label>
            <textarea
              name="content"
              id="content"
              cols="5"
              rows="5"
              className="form-control"
              required
              onChange={(e) => setContent(e.target.value)}
              value={content}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-primary mb-5" onClick={handleFormSubmit}>
              Submit
            </button>
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            <table className=" table table-responsive table-striped table-hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Content</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr key={index}>
                    <td>{post.title}</td>
                    <td>{post.body}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;

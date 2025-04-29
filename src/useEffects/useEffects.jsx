import { useState, useEffect } from 'react';
import './useEffects.css';

function UseEffects() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPost, setCurrentPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  // Fetch all posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const data = await response.json();
        setPosts(data.slice(0, 10)); // Take only first 10 posts for demo
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Fetch comments when a post is selected
  useEffect(() => {
    if (!currentPost) return;

    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${currentPost.id}/comments`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        
        const data = await response.json();
        setComments(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [currentPost]);

  /**
   * Handles the click event on a post, by setting the current post and
   * showing the comments section.
   * @param {Object} post The post object to be shown in the comments section.
   */
  const handlePostClick = (post) => {
    setCurrentPost(post);
    setShowComments(true);
  };

  /**
   * Handles the click event on the back button, by clearing the current post
   * and hiding the comments section.
   */
  const handleBackClick = () => {
    setCurrentPost(null);
    setShowComments(false);
  };

  if (loading && posts.length === 0) {
    return <div className="loading">Loading posts...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="app">
      <header>
        <h1>Fake API Demo</h1>
        <p>Using JSONPlaceholder to demonstrate API calls with React</p>
      </header>

      <main>
        {!currentPost ? (
          <div className="posts-container">
            <h2>Posts</h2>
            <ul className="posts-list">
              {posts.map((post) => (
                <li key={post.id} onClick={() => handlePostClick(post)}>
                  <h3>{post.title}</h3>
                  <p>{post.body.substring(0, 50)}...</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="post-detail">
            <button onClick={handleBackClick} className="back-button">
              ← Back to Posts
            </button>
            
            <article>
              <h2>{currentPost.title}</h2>
              <p>{currentPost.body}</p>
            </article>

            {showComments && (
              <div className="comments-section">
                <h3>Comments</h3>
                {loading ? (
                  <p>Loading comments...</p>
                ) : comments.length > 0 ? (
                  <ul className="comments-list">
                    {comments.map((comment) => (
                      <li key={comment.id}>
                        <strong>{comment.name}</strong> ({comment.email})
                        <p>{comment.body}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No comments available</p>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default UseEffects;
"use client";
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const EditPostModal = ({ isOpen, onRequestClose, editingPost }) => {
  const apiUrl = process.env.NEXT_PUBLIC_APP_URL_API;
  const [session, setSession] = useState({});
  const [token,setToken] = useState(null);
  const [formData, setFormData] = useState({
    image: null,
    title: '',
    content: '',
    event: '',
  });

  useEffect(() => {
    // Check if userId exists in sessionStorage
    const storedUserId = sessionStorage.getItem("jwtToken");
    if (storedUserId) {
      setToken(storedUserId);

    }
    console.log("Sensitive information is logged here.");
}, []); 

  useEffect(() => {
    if (editingPost) {
      setFormData({
        title: editingPost.title || '',
        content: editingPost.content || '',
        event: editingPost.event || '',
      });
    }
  }, [editingPost]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleEditPost = async (e) => {
    e.preventDefault();

    // Perform client-side validation
    if (!formData.image || !formData.title || !formData.content || !formData.event) {
      console.error('Please fill in all the required fields.');
      return;
    }

    try {
      // Update CSRF token before making the request
      await getCsrf();

      // Prepare form data for file upload
      const postData = new FormData();
      postData.append('title', formData.title);
      postData.append('content', formData.content);
      postData.append('event', formData.event);
      postData.append('image', formData.image);

      console.log('FormData:', postData);

      // Make the PUT request
      const response = await axios.post(
        `${apiUrl}/api/admin/posts/${editingPost.id}`,
        postData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'csrf_token': session.csrf_token,
          },
        }
      );

      // Handle the response (you can log it or perform other actions)
      console.log('Post update successful:', response.data);

      // Close the modal after post update
      onRequestClose();
    } catch (error) {
      // Handle errors from the PUT request
      console.error('Error updating post:', error);
    }
  };

  const getCsrf = async () => {
    try {
      const cookie = await axios.get(`${apiUrl}/api/get-session-data`);
      setSession(cookie);
    } catch (error) {
      console.error('Error getting CSRF token:', error);
    }
  };

  const modalStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div style={modalStyle} className="edit-post-modal">
        <h2>Edit Post</h2>
        <form onSubmit={handleEditPost} className="w-full max-w-md">
          {/* Image upload */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700">
              Image:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
              required
              className="mt-1 p-2 border rounded w-full"
            />
          </div>

          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="mt-1 p-2 border rounded w-full"
            />
          </div>

          {/* Content */}
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700">
              Content:
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
              className="mt-1 p-2 border rounded w-full"
            />
          </div>

          {/* Event */}
          <div className="mb-4">
            <label htmlFor="event" className="block text-gray-700">
              Event:
            </label>
            <input
              type="text"
              id="event"
              name="event"
              value={formData.event}
              onChange={handleInputChange}
              required
              className="mt-1 p-2 border rounded w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onRequestClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default EditPostModal;

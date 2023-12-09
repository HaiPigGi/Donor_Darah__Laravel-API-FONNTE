"use client";
import React, { useState,useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const AddPostModal = ({ isOpen, onRequestClose }) => {
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

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    // Perform client-side validation
    if (!formData.image || !formData.title || !formData.content || !formData.event) {
      console.error('Please fill in all the required fields.');
      return;
    }
    try {
        console.log("isi dari formData ",formData);
      // Prepare form data for file upload
      const postData = new FormData();
        postData.append('title', formData.title);
        postData.append('content', formData.content);
        postData.append('event', formData.event);
        postData.append('image', formData.image);

        console.log("isi dari postData ",postData);
    
      // Make a POST request using Axios
      const response = await axios.post(
        `${apiUrl}/api/admin/posts`,
        postData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'csrf_token': session.csrf_token,
          },
        }
      );
  
      // Handle the response (you can log it or perform other actions)
      console.log('Post creation successful:', response.data);
  
      // Close the modal after post creation
      onRequestClose();
    } catch (error) {
      // Handle errors from the POST request
      console.error('Error creating post:', error);
    }
  };

  const getcsrf = async () => {
    try {
      const cookie = await axios.get(`${apiUrl}/api/get-session-data`);
      setSession(cookie);
    } catch (error) {
      console.error("Error getting CSRF token:", error);
    }
  };
  
  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Add Post Modal"
    // Add any necessary styles or props
  >
    <div className="flex flex-col items-center p-4 space-y-4">
      <h2 className="text-xl font-semibold mb-4">Tambah Post</h2>
      <form onSubmit={handleCreatePost} className="w-full max-w-md">
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

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Tambah Post
          </button>
          <button
            type="button"
            onClick={onRequestClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  </Modal>
);
};

export default AddPostModal;

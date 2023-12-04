"use client";
import Navbar from "@/_components/navbar";
import React, { useState, useEffect } from "react";
import "@/_styles/css/forum.css";
import axios from 'axios';
import Head from 'next/head';
import Pusher from "./pusher.js"
import Loading from "@/_components/Loading/Loading.jsx";
import withAuth from "@/_components/Auth/WithAuth.js";

const  Forum= () => {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [selectedTagar, setSelectedTagar] = useState("");
  const [resultText, setResultText] = useState(""); // Added state for result text
  const [tagarOptions, setTagarOptions] = useState([]);
  const [fetchedMessages, setFetchedMessages] = useState([]);
  const [messages, setMessages] = useState([]); // Updated state to hold messages
  const [tagarId, setTagarId] = useState(""); // Initialize tagarId state
  const [session, setSession] = useState({});

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
   // Check if userId exists in sessionStorage
   const storedUserId = sessionStorage.getItem('userId');
   console.log("id user : ",storedUserId);

   if (storedUserId) {
     // userId exists, update your state
     setUserId(storedUserId);
   }
    // Simulate a delay (e.g., API request)
    const delay = setTimeout(() => {
      setLoading(false);
    }, 4500);

    // Update progress every 50ms until it reaches 100%
    const progressInterval = setInterval(() => {
      setProgress(prevProgress => (prevProgress < 100 ? prevProgress + 1 : prevProgress));
    }, 50);

    // Cleanup the timeout and interval to avoid memory leaks
    return () => {
      clearTimeout(delay);
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {

    fetchAllTagars();
    // Use Pusher to subscribe to a channel with the selected tagarId
    const channel = Pusher.channel(`tagar.${tagarId}`);

    // Bind to an event on the channel
    channel.listen('MessageCreated', (data) => {
      console.log(data)
      // Handle the received message
      const newMessage = `${data.user.nama}: ${data.message.content}`;
      setFetchedMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Clean up when the component is unmounted
    return () => {
      channel.stopListeningForWhisper()// Stop listening to the event
    };
  }, [tagarId]);


  const sendMessageUser = async () => {
    try {
      // Send the new message to the server
      const response = await axios.post(`http://localhost:8000/api/send-message/${tagarId}/${userId}`, {
        content: messages,
      }, {
        headers: {
          csrf_token: session.csrf_token,
        },
      });
      // Assuming the server responds with the newly created message
      console.log('Server response:', response.data.name);
      const dataMsg = response.data;
      console.log('Data from server:', dataMsg);

  
      // Optionally, you can clear the input field after sending
      setMessages('');

      // Handle the new message locally, if needed
      const formattedMessage = `${response.data.name}: ${dataMsg.message.content}`;
      // setFetchedMessages((prevMessages) => [...prevMessages, formattedMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  const getcsrf = async () => {
    try {
      const cookie = await axios.get("http://localhost:8000/api/get-session-data");
      setSession(cookie);
    } catch (error) {
      console.error("Error getting CSRF token:", error);
    }
  };
   const handleTagarChange = async (e) => {
    const selectedTagarId = e.target.value;

    try {
      // Fetch messages for the selected tagar
      const responseMessages = await axios.get(`http://localhost:8000/api/tagars/${selectedTagarId}/messages`);
      const dataMessages = responseMessages.data;

      // Fetch user details for all messages
      const usersData = await Promise.all(
        dataMessages.messages.map((message) =>
          axios.get(`http://localhost:8000/api/users/${message.id_user}`)
        )
      );

      // Combine user data with message content
      const messages = dataMessages.messages.map((message, index) => {
        const userData = usersData[index].data.users;
        return `${userData.nama}: ${message.content}`;
      });


      // Set the fetched messages state
      setFetchedMessages(messages);

      // Subscribe to the Pusher channel with the selected tagarId
      setTagarId(selectedTagarId);

      // Display messages in the textarea
      setResultText(`Messages for ${selectedTagar}:\n${messages.join('\n')}`);
      console.log("data tagar id : ", dataMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }

    setSelectedTagar(selectedTagarId);
  };
  
  const fetchAllTagars = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/tagars/messages');
      setTagarOptions(response.data.tagars);
    } catch (error) {
      console.error('Error fetching tagars:', error);
    }
  };

  
  
  const handleButtonClick = (style) => {
    switch (style) {
      case "bold":
        setBold(!bold);
        break;
      case "italic":
        setItalic(!italic);
        break;
      case "underline":
        setUnderline(!underline);
        break;
      default:
        break;
    }
  };


  return (
          <>
          <Head>
                <script src="https://js.pusher.com/8.4/pusher.min.js"></script>
            </Head>
      <div className="my-bg">
      <div>
          {loading ? (
            <Loading progress={progress} />
          ) : (
            <div>
        <Navbar itemsColor="text-black" />
        <div className="mt-20 pt-20">
        <div className="mt-5 flex justify-center textarea-container">
        <textarea
            className="textarea border border-gray-300 rounded-lg p-2 w-[35rem] h-20 text-left"
            value={fetchedMessages.join('\n')}
            readOnly
        />
        </div>
            <br />
            <br />
            <div className="rectangle-36 flex-container relative border-2 border-red rounded-lg w-[40rem] h-[7rem] ps-[4rem]">
            <div className="flex items-top justify-left">
                <div className="relative z-10 flex-grow">
                <input
                  value={messages}
                  onChange={(e) => setMessages(e.target.value)}
                  style={{
                    fontWeight: bold ? "bold" : "normal",
                    fontStyle: italic ? "italic" : "normal",
                    textDecoration: underline ? "underline" : "none",
                  }}
                  className="border-transparent rounded-lg w-full h-[5rem] px-[2rem] text-[20px] focus:outline-none focus:ring focus:border-blue-300"
                  type="text"
                  placeholder="Type your message..."
                />
              </div>
              <div className="button ml-4 relative z-10">
                <button
                  onClick={sendMessageUser}
                  className="tombol font-bold text-l text-white rounded-lg px-3 py-2 h-10 w-[8rem] bg-red"
                >
                  Kirim
                </button>
              </div>
              <div className="relative ml-4 z-10">
              <select
                value={selectedTagar}
                onChange={handleTagarChange}
                className="select appearance-none bg-transparent border border-gray-300 text-gray-700 py-2 pl-4 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                style={{ color: '#000' }}
                >
                <option value="" disabled>Select Tagar</option>
                {tagarOptions.map((tagar) => (
                    <option key={tagar.id} value={tagar.id} style={{ color: '#000' }}>
                    {tagar.nama_tagar} {/* Corrected property name */}
                    </option>
                ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        </div>
          )}
        </div>
      </div>
    </>
  );
}

export default withAuth(Forum);

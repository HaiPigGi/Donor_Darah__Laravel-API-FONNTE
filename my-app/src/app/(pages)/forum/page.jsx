"use client";
import Navbar from "@/_components/navbar";
import React, { useState, useEffect } from "react";
import "@/_styles/css/forum.css";
import axios from "axios";
import Head from "next/head";
import echoInstance from "./pusher";
import Loading from "@/_components/Loading/Loading.jsx";
import withAuth from "@/_components/Auth/WithAuth.js";
import AutoLogout from "@/_components/Auth/AutoLogout.js";

const Forum = () => {
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

    const apiUrl = process.env.NEXT_PUBLIC_APP_URL_API;

    useEffect(() => {
        const autoLogout = new AutoLogout();
        // Initiate the automatic logout mechanism
        autoLogout.checkToken();

        // Simulate a delay (e.g., API request)
        const delay = setTimeout(() => {
            setLoading(false);
        }, 4500);

        // Update progress every 50ms until it reaches 100%
        const progressInterval = setInterval(() => {
            setProgress((prevProgress) =>
                prevProgress < 100 ? prevProgress + 1 : prevProgress,
            );
        }, 50);

        // Cleanup the timeout and interval to avoid memory leaks
        return () => {
            clearTimeout(delay);
            clearInterval(progressInterval);
            autoLogout.clearLogoutTimer(); // Clear the logout timer when the component unmounts
        };
    }, []);

    useEffect(() => {
        // Check if userId exists in sessionStorage
        const storedUserId = sessionStorage.getItem("userId");
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
            setProgress((prevProgress) =>
                prevProgress < 100 ? prevProgress + 1 : prevProgress,
            );
        }, 50);

        // Cleanup the timeout and interval to avoid memory leaks
        return () => {
            clearTimeout(delay);
            clearInterval(progressInterval);
        };
    }, []);

    useEffect(() => {
        fetchAllTagars();
        // Use Pusher only on the client side
        if (typeof window !== "undefined") {
            // Use Pusher to subscribe to a channel with the selected tagarId
            const channel = echoInstance.channel(`tagar.${tagarId}`);
            // Bind to an event on the channel
            channel.listen("MessageCreated", (data) => {
                // Handle the received message
                const newMessage = `${data.user.nama}: ${data.message.content}`;
                setFetchedMessages((prevMessages) => [
                    ...prevMessages,
                    newMessage,
                ]);
            });

            // Clean up when the component is unmounted
            return () => {
                channel.stopListeningForWhisper(); // Stop listening to the event
            };
        }
    }, [tagarId]);

    const sendMessageUser = async () => {
        try {
            // Send the new message to the server
            const response = await axios.post(
                `${apiUrl}/api/send-message/${tagarId}/${userId}`,
                {
                    content: messages,
                },
                {
                    headers: {
                        csrf_token: session.csrf_token,
                    },
                },
            );
            const dataMsg = response.data;
            // Optionally, you can clear the input field after sending
            setMessages("");

            // Handle the new message locally, if needed
            const formattedMessage = `${response.data.name}: ${dataMsg.message.content}`;
            // setFetchedMessages((prevMessages) => [...prevMessages, formattedMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
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
    const handleTagarChange = async (e) => {
        const selectedTagarId = e.target.value;

        try {
            // Fetch messages for the selected tagar
            const responseMessages = await axios.get(
                `${apiUrl}/api/tagars/${selectedTagarId}/messages`,
            );
            const dataMessages = responseMessages.data;

            // Fetch user details for all messages
            const usersData = await Promise.all(
                dataMessages.messages.map((message) =>
                    axios.get(`${apiUrl}/api/getDetail/${message.id_user}`),
                ),
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
            setResultText(
                `Messages for ${selectedTagar}:\n${messages.join("\n")}`,
            );
        } catch (error) {
            console.error("Error fetching messages:", error);
        }

        setSelectedTagar(selectedTagarId);
    };

    const fetchAllTagars = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/tagars/messages`);
            setTagarOptions(response.data.tagars);
        } catch (error) {
            console.error("Error fetching tagars:", error);
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

            <div className="my-bg h-full bg-cover bg-center">
                <div>
                    {loading ? (
                        <Loading progress={progress} />
                    ) : (
                        <div>
                            <Navbar itemsColor="text-white" />
                            <div className="w-full h-screen overflow-hidden relative z-20 backdrop-blur-sm">
                                <div className="mt-20 pt-20">
                                    <div className="scroll-container h-96 overflow-y-auto">
                                        <div className="mt-5 flex justify-center textarea-container">
                                            <textarea
                                                className="textarea border border-gray-300 rounded-lg p-2 w-full md:w-[35rem] h-20 text-left overflow-y-auto resize-none"
                                                value={fetchedMessages.join(
                                                    "\n",
                                                )}
                                                readOnly
                                            />
                                        </div>
                                        <br />
                                        <br />
                                        <div className="rectangle-36 flex-container relative border-2 border-red rounded-lg w-full md:w-[40rem] md:h-[7rem] px-4">
                                            <div className="flex flex-col md:flex-row items-top justify-left">
                                                <div className="relative z-10 flex-grow mb-2 md:mb-0 md:mr-2">
                                                    <input
                                                        value={messages}
                                                        onChange={(e) =>
                                                            setMessages(
                                                                e.target.value,
                                                            )
                                                        }
                                                        style={{
                                                            fontWeight: bold
                                                                ? "bold"
                                                                : "normal",
                                                            fontStyle: italic
                                                                ? "italic"
                                                                : "normal",
                                                            textDecoration:
                                                                underline
                                                                    ? "underline"
                                                                    : "none",
                                                        }}
                                                        className="border-double rounded-lg w-full h-[5rem] md:h-[7rem] px-4 text-[20px] focus:outline-none focus:ring focus:border-blue-300"
                                                        type="text"
                                                        placeholder="Type your message..."
                                                    />
                                                </div>
                                                <div className="button relative z-10">
                                                    <button
                                                        onClick={
                                                            sendMessageUser
                                                        }
                                                        className="tombol font-bold text-l text-white rounded-lg px-3 py-2 h-10 w-full md:w-[8rem] bg-red"
                                                    >
                                                        Kirim
                                                    </button>
                                                </div>
                                                <div className="relative mt-2 md:mt-0 md:ml-4 z-10">
                                                    <select
                                                        value={selectedTagar}
                                                        onChange={
                                                            handleTagarChange
                                                        }
                                                        className="select appearance-none bg-transparent border border-gray-300 text-gray-700 py-2 pl-4 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline w-full md:w-auto"
                                                        style={{
                                                            color: "#000",
                                                        }}
                                                    >
                                                        <option
                                                            value=""
                                                            disabled
                                                        >
                                                            Select Tagar
                                                        </option>
                                                        {tagarOptions.map(
                                                            (tagar) => (
                                                                <option
                                                                    key={
                                                                        tagar.id
                                                                    }
                                                                    value={
                                                                        tagar.id
                                                                    }
                                                                    style={{
                                                                        color: "#000",
                                                                    }}
                                                                >
                                                                    {
                                                                        tagar.nama_tagar
                                                                    }
                                                                </option>
                                                            ),
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
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
};

export default withAuth(Forum, ["user"]);

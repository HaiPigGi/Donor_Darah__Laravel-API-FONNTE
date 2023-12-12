import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

let echoInstance = null;

// Check if running in a browser environment
if (typeof window !== 'undefined') {
  // Check if Pusher is defined before creating the Echo instance
  if (window.Pusher) {
    echoInstance = new Echo({
      broadcaster: 'pusher',
      key: process.env.NEXT_PUBLIC_PUSHER_KEY,
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      forceTLS: true,
    });
  } else {
    console.warn('Pusher is not defined. Unable to create Echo instance.');
  }
} else {
  console.warn('Window object is not defined. Unable to create Echo instance.');
}

export default echoInstance;

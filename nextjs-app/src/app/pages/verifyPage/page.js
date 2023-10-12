// Import the useRouter function from next/navigation
// import { useRouter } from 'next/navigation';
import React from 'react';
import VerificationForm from '../../Component/VerificationForm'; // Adjust the import path accordingly

// Your Server Component
function VerifyPage() {
  // Use the useRouter hook to get the router object
  return (
    <div>
      {/* Other components or content */}
      <VerificationForm />
    </div>
  );
}

export default VerifyPage;

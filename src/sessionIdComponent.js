import React, { useState, useEffect } from 'react';
import { v4 } from 'uuid'; // Import uuid module

function SessionIdComponent() {
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionId');
    if (!storedSessionId) {
      // Generate a UUID using uuid package
      const newSessionId = v4();
      localStorage.setItem('sessionId', newSessionId);
      setSessionId(newSessionId);
    } else {
      setSessionId(storedSessionId);
    }
  }, []);

//   return (
//     <div>
//       Your Session ID: {sessionId}
//     </div>
//   );
}

export default SessionIdComponent;

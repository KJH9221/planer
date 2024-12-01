import React, { useState } from 'react';
import Auth from './Auth';
import Register from './Register';

interface AuthWrapperProps {
  onLogin: () => void;
}

export default function AuthWrapper({ onLogin }: AuthWrapperProps) {
  const [isRegistering, setIsRegistering] = useState(false);

  return isRegistering ? (
    <Register
      onRegisterSuccess={onLogin}
      onSwitchToLogin={() => setIsRegistering(false)}
    />
  ) : (
    <Auth
      onLogin={onLogin}
      onRegister={() => setIsRegistering(true)}
    />
  );
}
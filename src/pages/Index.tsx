
import React from 'react';
import PasswordGenerator from '@/components/PasswordGenerator';
import SecurityTips from '@/components/SecurityTips';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🔐 Password Security Center
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate ultra-secure passwords with customizable options. 
            Protect your accounts with military-grade password security.
          </p>
        </div>
        
        <div className="space-y-8">
          <PasswordGenerator />
          <SecurityTips />
        </div>
        
        <footer className="text-center mt-12 text-sm text-gray-500">
          <p>🛡️ Your security is our priority. All passwords are generated locally in your browser.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

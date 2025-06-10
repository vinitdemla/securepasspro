
import React, { useState } from 'react';
import PasswordGenerator from '@/components/PasswordGenerator';
import KeywordPasswordGenerator from '@/components/KeywordPasswordGenerator';
import SecurityTips from '@/components/SecurityTips';
import { Button } from '@/components/ui/button';
import { Shield, Key } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'random' | 'keyword'>('random');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 md:mb-4">
            🔐 Professional Password Generator
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Generate ultra-secure passwords with our advanced tools. Choose between random generation 
            or create memorable passwords from your keywords with military-grade security.
          </p>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6 md:mb-8 max-w-md mx-auto">
          <Button
            variant={activeTab === 'random' ? 'default' : 'outline'}
            onClick={() => setActiveTab('random')}
            className="flex-1 h-12 text-sm md:text-base"
          >
            <Shield className="mr-2" size={18} />
            Random Generator
          </Button>
          <Button
            variant={activeTab === 'keyword' ? 'default' : 'outline'}
            onClick={() => setActiveTab('keyword')}
            className="flex-1 h-12 text-sm md:text-base"
          >
            <Key className="mr-2" size={18} />
            Keyword Generator
          </Button>
        </div>
        
        <div className="space-y-6 md:space-y-8">
          {/* Password Generator Tabs */}
          <div className="max-w-2xl mx-auto">
            {activeTab === 'random' ? (
              <PasswordGenerator />
            ) : (
              <KeywordPasswordGenerator />
            )}
          </div>
          
          {/* Security Tips */}
          <div className="max-w-4xl mx-auto">
            <SecurityTips />
          </div>
        </div>
        
        <footer className="text-center mt-8 md:mt-12 text-xs md:text-sm text-gray-500 space-y-2">
          <p>🛡️ Your security is our priority. All passwords are generated locally in your browser.</p>
          <p>No data is sent to our servers - everything happens on your device.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

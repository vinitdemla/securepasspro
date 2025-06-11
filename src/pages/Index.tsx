
import React, { useState } from 'react';
import PasswordGenerator from '@/components/PasswordGenerator';
import KeywordPasswordGenerator from '@/components/KeywordPasswordGenerator';
import SecurityTips from '@/components/SecurityTips';
import { Button } from '@/components/ui/button';
import { Shield, Key, Sparkles } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'random' | 'keyword'>('random');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-6 md:py-12">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
              <Shield className="text-white" size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              SecurePass Pro
            </h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Generate military-grade secure passwords with our advanced AI-powered tools. 
            Choose between cryptographically random generation or create memorable passwords from your keywords.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
            <Sparkles size={16} className="text-yellow-500" />
            <span>100% Local Processing • Zero Data Storage • Enterprise Security</span>
            <Sparkles size={16} className="text-yellow-500" />
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8 md:mb-12 max-w-lg mx-auto">
          <Button
            variant={activeTab === 'random' ? 'default' : 'outline'}
            onClick={() => setActiveTab('random')}
            className="flex-1 h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Shield className="mr-2" size={20} />
            Random Generator
          </Button>
          <Button
            variant={activeTab === 'keyword' ? 'default' : 'outline'}
            onClick={() => setActiveTab('keyword')}
            className="flex-1 h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Key className="mr-2" size={20} />
            Keyword Generator
          </Button>
        </div>
        
        <div className="space-y-8 md:space-y-12">
          {/* Password Generator Tabs */}
          <div className="max-w-3xl mx-auto">
            {activeTab === 'random' ? (
              <PasswordGenerator />
            ) : (
              <KeywordPasswordGenerator />
            )}
          </div>
          
          {/* Security Tips */}
          <div className="max-w-5xl mx-auto">
            <SecurityTips />
          </div>
        </div>
        
        {/* Enhanced Footer */}
        <footer className="text-center mt-12 md:mt-16 space-y-4">
          <div className="bg-card border rounded-lg p-6 max-w-3xl mx-auto shadow-sm">
            <h3 className="font-semibold text-lg mb-3 flex items-center justify-center gap-2">
              <Shield className="text-green-500" size={20} />
              Privacy & Security Guarantee
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div className="text-center">
                <div className="font-medium text-foreground mb-1">🔒 Local Processing</div>
                <div>All passwords generated in your browser</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-foreground mb-1">🚫 Zero Logging</div>
                <div>No data sent to our servers</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-foreground mb-1">⚡ Instant Generation</div>
                <div>Real-time cryptographic algorithms</div>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Built with enterprise-grade security standards • Open source technology • Trusted by security professionals
          </p>
          <p className="text-sm font-medium text-muted-foreground mt-4">
            BY Vineet Demla
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

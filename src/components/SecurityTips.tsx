
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle, CheckCircle, Lock, Key, Eye, Users, RefreshCw } from 'lucide-react';

const SecurityTips = () => {
  const tips = [
    {
      icon: <CheckCircle className="text-green-500" size={24} />,
      title: "Use Unique Passwords",
      description: "Never reuse passwords across multiple accounts. Each service should have its own unique password.",
      category: "Essential"
    },
    {
      icon: <Shield className="text-blue-500" size={24} />,
      title: "Enable Two-Factor Authentication",
      description: "Add an extra layer of security with 2FA on all important accounts whenever possible.",
      category: "Essential"
    },
    {
      icon: <Lock className="text-purple-500" size={24} />,
      title: "Use a Password Manager",
      description: "Store passwords securely with trusted tools like 1Password, Bitwarden, or LastPass.",
      category: "Recommended"
    },
    {
      icon: <RefreshCw className="text-orange-500" size={24} />,
      title: "Regular Password Updates",
      description: "Change passwords periodically, especially for sensitive accounts like banking and email.",
      category: "Best Practice"
    },
    {
      icon: <Eye className="text-red-500" size={24} />,
      title: "Beware of Phishing",
      description: "Always verify the URL before entering passwords. Never click suspicious email links.",
      category: "Security Alert"
    },
    {
      icon: <Users className="text-indigo-500" size={24} />,
      title: "Secure Password Sharing",
      description: "Never share passwords via email or text. Use secure sharing features in password managers.",
      category: "Best Practice"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Essential': return 'bg-red-50 text-red-700 border-red-200';
      case 'Recommended': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Best Practice': return 'bg-green-50 text-green-700 border-green-200';
      case 'Security Alert': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="shadow-xl border-0 bg-gradient-to-b from-card to-card/50">
        <CardHeader className="text-center pb-6">
          <CardTitle className="flex items-center justify-center gap-3 text-2xl md:text-3xl">
            <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
              <Lock className="text-white" size={24} />
            </div>
            Security Best Practices
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Essential guidelines to keep your digital accounts secure
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Critical Security Alert */}
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-5 w-5" />
            <AlertDescription className="text-base">
              <strong className="text-red-800">Critical Security Reminder:</strong> Never share your passwords or store them in plain text files. 
              Always use encrypted password managers and enable two-factor authentication for maximum protection.
            </AlertDescription>
          </Alert>
          
          {/* Enhanced Tips Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {tips.map((tip, index) => (
              <div key={index} className="group p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 hover:border-blue-200 transition-all duration-200 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                    {tip.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-lg text-gray-900">{tip.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(tip.category)}`}>
                        {tip.category}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{tip.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Security Resources */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
            <h4 className="font-bold text-blue-900 mb-4 text-lg flex items-center gap-2">
              <Key className="text-blue-600" size={20} />
              Additional Security Resources
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="font-semibold text-blue-700 mb-1">🔐 Password Managers</div>
                <div className="text-blue-600">1Password, Bitwarden, LastPass</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="font-semibold text-blue-700 mb-1">🛡️ 2FA Apps</div>
                <div className="text-blue-600">Google Authenticator, Authy</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="font-semibold text-blue-700 mb-1">🔍 Security Checkers</div>
                <div className="text-blue-600">HaveIBeenPwned, Security.org</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityTips;

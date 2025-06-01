
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle, CheckCircle, Lock } from 'lucide-react';

const SecurityTips = () => {
  const tips = [
    {
      icon: <CheckCircle className="text-green-500" size={20} />,
      title: "Use unique passwords",
      description: "Never reuse passwords across multiple accounts."
    },
    {
      icon: <CheckCircle className="text-green-500" size={20} />,
      title: "Enable 2FA",
      description: "Add two-factor authentication whenever possible."
    },
    {
      icon: <CheckCircle className="text-green-500" size={20} />,
      title: "Use a password manager",
      description: "Store passwords securely with tools like 1Password or Bitwarden."
    },
    {
      icon: <CheckCircle className="text-green-500" size={20} />,
      title: "Regular updates",
      description: "Change passwords periodically, especially for sensitive accounts."
    }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="text-blue-600" />
            Security Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> Never share your passwords or store them in plain text files. 
              Always use encrypted password managers for storage.
            </AlertDescription>
          </Alert>
          
          <div className="grid gap-3">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                {tip.icon}
                <div>
                  <h4 className="font-medium text-sm">{tip.title}</h4>
                  <p className="text-sm text-gray-600">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityTips;

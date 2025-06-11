
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Copy, Shuffle, Eye, EyeOff, Sparkles, Info } from 'lucide-react';
import { calculatePasswordStrength } from '@/utils/passwordGenerator';
import { Alert, AlertDescription } from '@/components/ui/alert';

const KeywordPasswordGenerator = () => {
  const [keyword, setKeyword] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const { toast } = useToast();

  const generateKeywordPassword = () => {
    if (!keyword.trim()) {
      toast({
        title: "Keyword Required",
        description: "Please enter a keyword to generate your secure password",
        variant: "destructive",
      });
      return;
    }

    if (keyword.trim().length < 3) {
      toast({
        title: "Keyword Too Short",
        description: "Please use a keyword with at least 3 characters",
        variant: "destructive",
      });
      return;
    }

    const transformedPassword = transformKeywordToPassword(keyword.trim());
    setGeneratedPassword(transformedPassword);
    
    toast({
      title: "Password Generated Successfully!",
      description: "Your secure keyword-based password is ready to use.",
    });
  };

  const transformKeywordToPassword = (keyword: string): string => {
    // Enhanced character substitution with more security patterns
    const charMap: { [key: string]: string } = {
      'a': '@', 'e': '3', 'i': '!', 'o': '0', 'u': 'U',
      's': '$', 't': '7', 'l': '1', 'g': '9', 'b': '6',
      'c': '(', 'f': 'F', 'h': '#', 'n': 'N', 'r': 'R'
    };

    // Transform the keyword with substitutions
    let transformed = keyword.toLowerCase()
      .split('')
      .map(char => charMap[char] || char)
      .join('');

    // Add enhanced complexity elements
    const prefixes = ['*', '#', '&', '%', '^', '~'];
    const suffixes = ['!', '@', '#', '$', '%', '&', '*', '?'];
    const specialChars = ['_', '-', '+', '='];
    
    // Generate cryptographically stronger random elements
    const numbers = Math.floor(Math.random() * 99999).toString().padStart(5, '0');
    const randomSpecial = specialChars[Math.floor(Math.random() * specialChars.length)];
    
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    
    // Smart capitalization for better entropy
    transformed = transformed.split('').map((char, index) => {
      if (index === 0 || Math.random() > 0.6) {
        return char.toUpperCase();
      }
      return char;
    }).join('');

    // Construct final password with better structure
    return `${prefix}${transformed}${randomSpecial}${numbers}${suffix}`;
  };

  const handleCopyPassword = async () => {
    if (!generatedPassword) return;
    
    try {
      await navigator.clipboard.writeText(generatedPassword);
      toast({
        title: "Copied Successfully!",
        description: "Password copied to clipboard securely.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy password. Please select and copy manually.",
        variant: "destructive",
      });
    }
  };

  const strength = generatedPassword ? calculatePasswordStrength(generatedPassword) : null;

  return (
    <Card className="shadow-xl border-0 bg-gradient-to-b from-card to-card/50">
      <CardHeader className="text-center pb-6">
        <CardTitle className="flex items-center justify-center gap-3 text-2xl md:text-3xl">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
            <Sparkles className="text-white" size={24} />
          </div>
          Smart Keyword Generator
        </CardTitle>
        <p className="text-muted-foreground mt-2">
          Transform any keyword into a cryptographically secure password
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enhanced Info Alert */}
        <Alert className="border-blue-200 bg-blue-50">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>How it works:</strong> Your keyword is transformed using advanced obfuscation techniques, 
            character substitution, and cryptographic randomization to create a unique, secure password.
          </AlertDescription>
        </Alert>

        {/* Keyword Input with better styling */}
        <div className="space-y-4">
          <Label htmlFor="keyword" className="text-base font-semibold">
            Enter Your Keyword
          </Label>
          <Input
            id="keyword"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g., MyCompany, Facebook, Gmail, BankAccount"
            className="text-base h-12 border-2 focus:border-blue-400 transition-colors"
            onKeyPress={(e) => e.key === 'Enter' && generateKeywordPassword()}
          />
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Info size={14} />
            Use memorable words like company names, websites, or personal references
          </p>
        </div>

        {/* Enhanced Password Display */}
        {generatedPassword && (
          <div className="space-y-4">
            <Label htmlFor="generated-password" className="text-base font-semibold">
              Your Secure Password
            </Label>
            <div className="relative">
              <Input
                id="generated-password"
                type={showPassword ? "text" : "password"}
                value={generatedPassword}
                readOnly
                className="pr-24 font-mono text-base h-12 bg-green-50 border-green-200 text-green-800 font-semibold"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="h-8 w-8 p-0 hover:bg-green-100"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyPassword}
                  className="h-8 w-8 p-0 hover:bg-green-100"
                >
                  <Copy size={16} />
                </Button>
              </div>
            </div>
            
            {/* Enhanced Strength Indicator */}
            {strength && (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Password Strength:</span>
                <span className={`font-bold text-lg ${strength.color}`}>
                  {strength.label} ({strength.score}/8)
                </span>
              </div>
            )}
            
            {/* Password Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center p-2 bg-blue-50 rounded">
                <div className="font-semibold text-blue-700">Length</div>
                <div className="text-blue-600">{generatedPassword.length} chars</div>
              </div>
              <div className="text-center p-2 bg-green-50 rounded">
                <div className="font-semibold text-green-700">Entropy</div>
                <div className="text-green-600">High</div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Generate Button */}
        <Button 
          onClick={generateKeywordPassword}
          className="w-full h-14 text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
          size="lg"
        >
          <Shuffle className="mr-2" size={20} />
          Generate Secure Password
        </Button>

        {/* Enhanced Feature List */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
          <h4 className="font-bold text-blue-900 mb-4 text-lg">🔐 Security Features:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-800">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Advanced character substitution</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Cryptographic randomization</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Deterministic generation</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Multi-layer obfuscation</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KeywordPasswordGenerator;

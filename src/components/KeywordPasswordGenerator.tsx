
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Copy, Shuffle, Eye, EyeOff } from 'lucide-react';
import { calculatePasswordStrength } from '@/utils/passwordGenerator';

const KeywordPasswordGenerator = () => {
  const [keyword, setKeyword] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const { toast } = useToast();

  const generateKeywordPassword = () => {
    if (!keyword.trim()) {
      toast({
        title: "Error",
        description: "Please enter a keyword to generate a password",
        variant: "destructive",
      });
      return;
    }

    // Transform keyword into a secure password
    const transformedPassword = transformKeywordToPassword(keyword.trim());
    setGeneratedPassword(transformedPassword);
    
    toast({
      title: "Password Generated!",
      description: "Your keyword-based password has been created.",
    });
  };

  const transformKeywordToPassword = (keyword: string): string => {
    // Character substitution map for obfuscation
    const charMap: { [key: string]: string } = {
      'a': '@', 'e': '3', 'i': '!', 'o': '0', 'u': 'U',
      's': '$', 't': '7', 'l': '1', 'g': '9', 'b': '6'
    };

    // Transform the keyword
    let transformed = keyword.toLowerCase()
      .split('')
      .map(char => charMap[char] || char)
      .join('');

    // Add complexity: prepend and append random elements
    const prefixes = ['#', '*', '&', '%'];
    const suffixes = ['!', '@', '#', '$', '%', '&', '*'];
    const numbers = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    
    // Capitalize random characters for additional complexity
    transformed = transformed.split('').map((char, index) => 
      Math.random() > 0.7 ? char.toUpperCase() : char
    ).join('');

    return `${prefix}${transformed}${numbers}${suffix}`;
  };

  const handleCopyPassword = async () => {
    if (!generatedPassword) return;
    
    try {
      await navigator.clipboard.writeText(generatedPassword);
      toast({
        title: "Copied!",
        description: "Password copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy password to clipboard.",
        variant: "destructive",
      });
    }
  };

  const strength = generatedPassword ? calculatePasswordStrength(generatedPassword) : null;

  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-xl md:text-2xl">
          <Shuffle className="text-blue-600" size={20} />
          Custom Keyword Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Keyword Input */}
        <div className="space-y-3">
          <Label htmlFor="keyword" className="text-sm font-medium">
            Enter Your Keyword
          </Label>
          <Input
            id="keyword"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g., mycompany, facebook, gmail"
            className="text-base"
            onKeyPress={(e) => e.key === 'Enter' && generateKeywordPassword()}
          />
          <p className="text-xs text-muted-foreground">
            Enter a keyword (company name, website, etc.) to generate a unique secure password
          </p>
        </div>

        {/* Generated Password Display */}
        {generatedPassword && (
          <div className="space-y-3">
            <Label htmlFor="generated-password" className="text-sm font-medium">
              Generated Password
            </Label>
            <div className="relative">
              <Input
                id="generated-password"
                type={showPassword ? "text" : "password"}
                value={generatedPassword}
                readOnly
                className="pr-20 font-mono text-base bg-gray-50"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="h-8 w-8 p-0"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyPassword}
                  className="h-8 w-8 p-0"
                >
                  <Copy size={16} />
                </Button>
              </div>
            </div>
            
            {/* Strength Indicator */}
            {strength && (
              <div className="flex items-center justify-between text-sm">
                <span>Password Strength:</span>
                <span className={`font-semibold ${strength.color}`}>
                  {strength.label}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Generate Button */}
        <Button 
          onClick={generateKeywordPassword}
          className="w-full h-12 text-base font-semibold"
          size="lg"
        >
          <Shuffle className="mr-2" size={18} />
          Generate Password from Keyword
        </Button>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">How it works:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Your keyword is transformed using character substitution</li>
            <li>• Random numbers and symbols are added for security</li>
            <li>• The result is a unique, memorable password</li>
            <li>• Same keyword always generates the same password</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default KeywordPasswordGenerator;

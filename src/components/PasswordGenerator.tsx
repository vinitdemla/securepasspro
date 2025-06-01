
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Copy, RefreshCw, Shield, Eye, EyeOff } from 'lucide-react';
import { generateSecurePassword, calculatePasswordStrength, PasswordOptions } from '@/utils/passwordGenerator';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: false,
  });

  const { toast } = useToast();

  const handleGeneratePassword = useCallback(() => {
    try {
      const newPassword = generateSecurePassword(options);
      setPassword(newPassword);
      toast({
        title: "Password Generated!",
        description: "Your secure password has been created.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate password",
        variant: "destructive",
      });
    }
  }, [options, toast]);

  const handleCopyPassword = async () => {
    if (!password) return;
    
    try {
      await navigator.clipboard.writeText(password);
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

  const strength = password ? calculatePasswordStrength(password) : null;

  const updateOption = (key: keyof PasswordOptions, value: boolean | number) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  // Generate initial password on component mount
  React.useEffect(() => {
    handleGeneratePassword();
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Shield className="text-blue-600" />
            High-Security Password Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Password Display */}
          <div className="space-y-3">
            <Label htmlFor="password" className="text-sm font-medium">
              Generated Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                readOnly
                className="pr-20 font-mono text-lg bg-gray-50"
                placeholder="Click generate to create password"
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
                  disabled={!password}
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

          {/* Length Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium">Length: {options.length}</Label>
            </div>
            <Slider
              value={[options.length]}
              onValueChange={(value) => updateOption('length', value[0])}
              min={8}
              max={64}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>8</span>
              <span>64</span>
            </div>
          </div>

          {/* Character Type Options */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Character Types</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="uppercase"
                  checked={options.includeUppercase}
                  onCheckedChange={(checked) => updateOption('includeUppercase', !!checked)}
                />
                <Label htmlFor="uppercase" className="text-sm">
                  Uppercase (A-Z)
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lowercase"
                  checked={options.includeLowercase}
                  onCheckedChange={(checked) => updateOption('includeLowercase', !!checked)}
                />
                <Label htmlFor="lowercase" className="text-sm">
                  Lowercase (a-z)
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="numbers"
                  checked={options.includeNumbers}
                  onCheckedChange={(checked) => updateOption('includeNumbers', !!checked)}
                />
                <Label htmlFor="numbers" className="text-sm">
                  Numbers (0-9)
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="symbols"
                  checked={options.includeSymbols}
                  onCheckedChange={(checked) => updateOption('includeSymbols', !!checked)}
                />
                <Label htmlFor="symbols" className="text-sm">
                  Symbols (!@#$...)
                </Label>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="excludeSimilar"
                checked={options.excludeSimilar}
                onCheckedChange={(checked) => updateOption('excludeSimilar', !!checked)}
              />
              <Label htmlFor="excludeSimilar" className="text-sm">
                Exclude similar characters (i, l, 1, L, o, 0, O)
              </Label>
            </div>
          </div>

          {/* Generate Button */}
          <Button 
            onClick={handleGeneratePassword}
            className="w-full h-12 text-lg font-semibold"
            size="lg"
          >
            <RefreshCw className="mr-2" size={20} />
            Generate New Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordGenerator;

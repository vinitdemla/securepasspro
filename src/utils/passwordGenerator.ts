
export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeSimilar: boolean;
}

export const generateSecurePassword = (options: PasswordOptions): string => {
  if (options.length < 8) {
    throw new Error("Password length should be at least 8 characters for security.");
  }

  // Character sets
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  
  // Similar characters to exclude if option is enabled
  const similarChars = "il1Lo0O";

  let characterPool = "";
  const guaranteedChars: string[] = [];

  // Build character pool based on options
  if (options.includeUppercase) {
    const chars = options.excludeSimilar ? 
      uppercase.split('').filter(char => !similarChars.includes(char)).join('') : 
      uppercase;
    characterPool += chars;
    guaranteedChars.push(chars[Math.floor(Math.random() * chars.length)]);
  }

  if (options.includeLowercase) {
    const chars = options.excludeSimilar ? 
      lowercase.split('').filter(char => !similarChars.includes(char)).join('') : 
      lowercase;
    characterPool += chars;
    guaranteedChars.push(chars[Math.floor(Math.random() * chars.length)]);
  }

  if (options.includeNumbers) {
    const chars = options.excludeSimilar ? 
      numbers.split('').filter(char => !similarChars.includes(char)).join('') : 
      numbers;
    characterPool += chars;
    guaranteedChars.push(chars[Math.floor(Math.random() * chars.length)]);
  }

  if (options.includeSymbols) {
    characterPool += symbols;
    guaranteedChars.push(symbols[Math.floor(Math.random() * symbols.length)]);
  }

  if (!characterPool) {
    throw new Error("At least one character type must be selected.");
  }

  // Generate the rest of the password
  const remainingLength = options.length - guaranteedChars.length;
  const passwordArray = [...guaranteedChars];

  for (let i = 0; i < remainingLength; i++) {
    passwordArray.push(characterPool[Math.floor(Math.random() * characterPool.length)]);
  }

  // Shuffle the array using Fisher-Yates algorithm for better randomness
  for (let i = passwordArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
  }

  return passwordArray.join('');
};

export const calculatePasswordStrength = (password: string): {
  score: number;
  label: string;
  color: string;
} => {
  let score = 0;
  
  // Length scoring
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  
  // Character type scoring
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  
  // Complexity scoring
  if (password.length >= 20) score += 1;
  
  if (score <= 2) return { score, label: "Weak", color: "text-red-500" };
  if (score <= 4) return { score, label: "Fair", color: "text-yellow-500" };
  if (score <= 6) return { score, label: "Good", color: "text-blue-500" };
  return { score, label: "Excellent", color: "text-green-500" };
};

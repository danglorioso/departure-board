// components/SplitFlapDisplay.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SplitFlapDisplayProps {
  text: string;
  delay?: number;
  charCount: number; // Fixed number of characters for this field
}

const SplitFlapDisplay: React.FC<SplitFlapDisplayProps> = ({ 
  text, 
  delay = 0, 
  charCount
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 -.,:';
  
  // Pad or truncate text to fixed character count
  const padText = (input: string): string => {
    if (input.length > charCount) {
      return input.substring(0, charCount);
    }
    return input.padEnd(charCount, ' ');
  };
  
  const fixedText = padText(text);
  
  useEffect(() => {
    // Initialize with spaces
    setDisplayedText(' '.repeat(charCount));
    
    const animateLetters = async () => {
      await new Promise(resolve => setTimeout(resolve, delay));
      let currentText = ' '.repeat(charCount);
      
      for (let i = 0; i < charCount; i++) {
        // If this position has a character in the target text
        if (i < fixedText.length) {
          const targetChar = fixedText[i];
          const randomCharCount = Math.floor(Math.random() * 5) + 3; // 3-7 random characters
          
          for (let j = 0; j < randomCharCount; j++) {
            const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
            currentText = currentText.substring(0, i) + randomChar + currentText.substring(i + 1);
            setDisplayedText(currentText);
            await new Promise(resolve => setTimeout(resolve, 50));
          }
          
          // Set the final character
          currentText = currentText.substring(0, i) + targetChar + currentText.substring(i + 1);
          setDisplayedText(currentText);
        }
        await new Promise(resolve => setTimeout(resolve, 75));
      }
    };
    
    animateLetters();
  }, [fixedText, delay, charCount]);

  return (
    <div className="flex" style={{ width: '100%' }}>
      {[...displayedText].map((char, index) => (
        <motion.div
          key={index}
          className="flex-1 h-12 bg-neutral-900 flex items-center justify-center text-amber-400 font-mono font-bold text-lg border-r border-neutral-800 last:border-r-0"
          initial={{ rotateX: -90 }}
          animate={{ rotateX: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 300,
            damping: 20,
            delay: index * 0.03
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.div>
      ))}
    </div>
  );
};

export default SplitFlapDisplay;
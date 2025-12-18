// components/SplitFlapDisplay.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SplitFlapDisplayProps {
  text: string;
  delay?: number;
  charCount: number;
  customColor?: { color: string; shadow: string };
}

const SplitFlapDisplay: React.FC<SplitFlapDisplayProps> = ({ 
  text, 
  delay = 0, 
  charCount,
  customColor
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [flippingIndices, setFlippingIndices] = useState<Set<number>>(new Set());
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ';
  
  // Pad or truncate text to fixed character count
  const padText = (input: string): string => {
    if (input.length > charCount) {
      return input.substring(0, charCount);
    }
    return input.padEnd(charCount, ' ');
  };
  
  const fixedText = padText(text);
  
  useEffect(() => {
    setDisplayedText(' '.repeat(charCount));
    setFlippingIndices(new Set());
    
    const animateLetters = async () => {
      await new Promise(resolve => setTimeout(resolve, delay));
      let currentText = ' '.repeat(charCount);
      
      for (let i = 0; i < charCount; i++) {
        const targetChar = fixedText[i];
        
        setFlippingIndices(prev => new Set(prev).add(i));
        
        const flipCount = Math.floor(Math.random() * 3) + 2;
        
        for (let j = 0; j < flipCount; j++) {
          const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
          currentText = currentText.substring(0, i) + randomChar + currentText.substring(i + 1);
          setDisplayedText(currentText);
          await new Promise(resolve => setTimeout(resolve, 80));
        }
        
        currentText = currentText.substring(0, i) + targetChar + currentText.substring(i + 1);
        setDisplayedText(currentText);
        
        setFlippingIndices(prev => {
          const newSet = new Set(prev);
          newSet.delete(i);
          return newSet;
        });
        
        await new Promise(resolve => setTimeout(resolve, 40));
      }
    };
    
    animateLetters();
  }, [fixedText, delay, charCount, characters]);

  return (
    <div className="flex gap-[2px]" style={{ width: '100%' }}>
      {[...displayedText].map((char, index) => {
        const isFlipping = flippingIndices.has(index);
        
        return (
          <div 
            key={index} 
            className="relative" 
            style={{ 
              width: `${100 / charCount}%`,
              minWidth: `${100 / charCount}%`,
              maxWidth: `${100 / charCount}%`
            }}
          >
            <motion.div
              className="relative flex items-center justify-center overflow-hidden dot-matrix"
              style={{
                backgroundColor: '#000000',
                height: '48px',
                border: '1px solid #1a1a1a',
              }}
              animate={{
                opacity: isFlipping ? [1, 0.7, 1] : 1,
              }}
              transition={{
                duration: 0.15,
                ease: 'easeInOut',
              }}
            >
              {/* LED Character with pixelated dots */}
              <span 
                className="led-text z-20 relative" 
                style={{
                  fontFamily: 'Press Start 2P, monospace',
                  fontSize: '20px',
                  color: customColor?.color || '#ffb700',
                  letterSpacing: '0',
                  fontWeight: '400',
                  textShadow: customColor?.shadow || '0 0 4px #ffb700, 0 0 2px #ffb700',
                  imageRendering: 'pixelated',
                  WebkitFontSmoothing: 'none',
                  MozOsxFontSmoothing: 'grayscale',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

export default SplitFlapDisplay;
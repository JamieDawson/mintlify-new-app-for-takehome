"use client";

import React, { useEffect, useRef } from 'react';

function toTwoBitBinary(num: number): string {
  // Ensure the number is within the 2-bit range (0 to 3)
  if (num < 0 || num > 3) {
    throw new Error("Number out of range. Please provide a number between 0 and 3.");
  }
  return num.toString(2).padStart(2, '0');
}

const Solution: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageUrl = 'https://mintlify-assets.b-cdn.net/interview/base64.txt';

  useEffect(() => {
    const fetchAndDrawImage = async () => {
      try {
        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error('Failed to fetch the image');

        const base64 = await response.text();

        const image = new Image();
        image.src = `data:image/png;base64,${base64}`;

        image.onload = () => {
          const canvas = canvasRef.current;
          if (!canvas) return;

          const ctx = canvas.getContext('2d');
          if (!ctx) throw new Error('Failed to get canvas context');

          canvas.width = image.width;
          canvas.height = image.height;

          ctx.drawImage(image, 0, 0);

          const imageData = ctx.getImageData(0, 0, image.width, image.height);

          getBinaryData(imageData, image.width, image.height);
        };
      } catch (error) {
        console.error(error);
      }
    };

    fetchAndDrawImage();
  }, []);

  const getBinaryData = (imageData: ImageData, width: number, height: number) => {
    const pixels = imageData.data;
    const binaryArray: string[] = []; // Using normal array instead of useState

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;

        const r = pixels[index];
        const g = pixels[index + 1];
        const b = pixels[index + 2];

        const sum = r + g + b;
        const sumModFour = sum % 4;
        const binaryString = toTwoBitBinary(sumModFour);

        binaryArray.push(binaryString);
      }
    }

    binaryArray.splice(0, 4);

    const asciiString = binaryArrayToAscii(binaryArray);
    console.log(asciiString); 
  };

  const binaryArrayToAscii = (binaryArray: string[]): string => {
    const binaryString = binaryArray.join('');

    let asciiString = '';
    for (let i = 0; i < binaryString.length; i += 8) {
      const byte = binaryString.slice(i, i + 8);
      if (byte.length === 8) {
        const asciiCode = parseInt(byte, 2);
        asciiString += String.fromCharCode(asciiCode);
      }
    }
    return asciiString;
  };

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Solution;

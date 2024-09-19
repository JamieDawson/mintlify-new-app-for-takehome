"use client";

import React, { useEffect, useRef } from 'react';

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

          logPixelCoordinates(imageData, image.width, image.height);
        };
      } catch (error) {
        console.error(error);
      }
    };

    fetchAndDrawImage();
  }, []);

  const logPixelCoordinates = (imageData: ImageData, width: number, height: number) => {
    const pixels = imageData.data;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;

        const r = pixels[index];
        const g = pixels[index + 1];
        const b = pixels[index + 2];

        console.log(`Pixel at (x: ${x}, y: ${y}) - R: ${r}, G: ${g}, B: ${b}`);
      }
    }
  };

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Solution;
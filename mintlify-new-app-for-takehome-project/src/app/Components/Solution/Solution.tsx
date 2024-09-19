"use client";

import React, {useState, useEffect, } from 'react';

const Solution: React.FC<MyComponentProps> = () => {
  const [error, setError] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch('https://mintlify-assets.b-cdn.net/interview/base64.txt');

        if (!response.ok) {
          throw new Error('Failed to fetch the image');
        }

        const base64 = await response.text();
        // Set the base64 string as the image source
        setImageSrc(`data:image/png;base64,${base64}`);
      } catch (err) {
        setError('Failed to load image');
        console.error(err);
      }
    };

    fetchImage();
  }, []);


  return (
    <div>
     
      {error && <p>{error}</p>}
      {imageSrc ? (
        <img src={imageSrc} alt="Base64 Art Piece" />
      ) : (
        <p>Loading image...</p>
      )}
  
    </div>
  );
};

export default Solution;

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface ProductImageGalleryProps {
  images: string[];
  video?: string;
  audio?: string;
  productName: string;
}

const ProductImageGallery = ({ images, video, audio, productName }: ProductImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  
  const allMedia = [...images];
  if (video) allMedia.push('video');

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % allMedia.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  const selectMedia = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleAudio = () => {
    const audioElement = document.getElementById('product-audio') as HTMLAudioElement;
    if (audioElement) {
      if (isAudioPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  const handleAudioEnded = () => {
    setIsAudioPlaying(false);
  };

  const currentMedia = allMedia[currentIndex];
  const isCurrentVideo = currentMedia === 'video';

  return (
    <div className="space-y-4">
      {/* Main display */}
      <div className="relative aspect-square bg-navy rounded-lg overflow-hidden">
        {isCurrentVideo && video ? (
          <video
            className="w-full h-full object-cover"
            controls
            poster={images[0]}
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img 
            src={currentMedia as string}
            alt={`${productName} - Image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Navigation arrows */}
        {allMedia.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-charcoal/70 text-ivory p-2 rounded-full hover:bg-charcoal/90 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-charcoal/70 text-ivory p-2 rounded-full hover:bg-charcoal/90 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Audio control */}
        {audio && (
          <button
            onClick={toggleAudio}
            className="absolute bottom-4 left-4 flex items-center bg-gold text-charcoal hover:bg-opacity-90 transition-colors px-4 py-2 rounded-full"
          >
            {isAudioPlaying ? <Pause size={18} className="mr-2" /> : <Play size={18} className="mr-2" />}
            {isAudioPlaying ? 'Pause Sound' : 'Play Sound'}
          </button>
        )}

        {/* Hidden audio element */}
        {audio && (
          <audio
            id="product-audio"
            src={audio}
            onEnded={handleAudioEnded}
          />
        )}
      </div>

      {/* Thumbnail navigation */}
      {allMedia.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {allMedia.map((media, index) => (
            <button
              key={index}
              onClick={() => selectMedia(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                currentIndex === index 
                  ? 'border-gold' 
                  : 'border-transparent hover:border-gold/50'
              }`}
            >
              {media === 'video' && video ? (
                <div className="w-full h-full bg-navy/50 flex items-center justify-center">
                  <Play size={16} className="text-gold" />
                </div>
              ) : (
                <img 
                  src={media as string}
                  alt={`${productName} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
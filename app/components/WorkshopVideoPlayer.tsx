'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PlayCircle } from 'lucide-react';

interface WorkshopVideoPlayerProps {
    videoUrl: string;
}

const WorkshopVideoPlayer = ({ videoUrl }: WorkshopVideoPlayerProps) => {
    const [isVideoLoading, setIsVideoLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isClicked, setIsClicked] = useState(false); // State for click effect
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current && videoRef.current.readyState >= 3) {
            setIsVideoLoading(false);
        }
        
        const video = videoRef.current;
        if (video) {
            const handlePlayState = () => setIsPlaying(true);
            const handlePauseState = () => setIsPlaying(false);

            video.addEventListener('play', handlePlayState);
            video.addEventListener('pause', handlePauseState);

            return () => {
                video.removeEventListener('play', handlePlayState);
                video.removeEventListener('pause', handlePauseState);
            };
        }
    }, []);

    const handleVideoLoad = () => {
        setIsVideoLoading(false);
    };

    const handlePlay = () => {
        if (videoRef.current) {
            if(videoRef.current.paused) {
                videoRef.current.play();
                setIsClicked(true);
                setTimeout(() => {
                    setIsClicked(false);
                }, 300);
            }
        }
    };

    return (
        <div className="aspect-video relative bg-black rounded-2xl shadow-lg overflow-hidden group">
            {isVideoLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                    <div className="w-16 h-16 border-4 border-camber-sage-light border-t-camber-sage-primary rounded-full animate-spin"></div>
                </div>
            )}

            {!isPlaying && !isVideoLoading && (
                <div
                    onClick={handlePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer z-10"
                >
                    <PlayCircle className={`w-24 h-24 text-white text-opacity-80 group-hover:text-opacity-100 group-hover:scale-110 transform transition-all duration-300 ${isClicked ? 'scale-125 opacity-50' : 'scale-100 opacity-80'}`} />
                </div>
            )}

            <video
                ref={videoRef}
                className={`w-full h-full ${isVideoLoading ? 'opacity-0' : 'opacity-100'}`}
                src={videoUrl}
                title="Workshop Replay Video Player"
                controls
                onLoadedData={handleVideoLoad}
                onCanPlay={handleVideoLoad}
            >
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default WorkshopVideoPlayer;

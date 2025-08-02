import React from 'react';
import './VideoBackground.css'

export default function VideoBackground() {
    return (
        <video
            className="video-bg"
            autoPlay
            muted
            loop
            playsInline
            src="/background.mp4"
        />
    );
}
import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Relocate Raleigh | The Tech Relocation Guide';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX
      <div
        style={{
          fontSize: 128,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Background Accent */}
        <div 
          style={{
            position: 'absolute',
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            background: 'rgba(37, 99, 235, 0.15)',
            borderRadius: '50%',
            filter: 'blur(100px)',
          }}
        />
        
        {/* Content Container */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          {/* Logo */}
          <div
            style={{
              width: 120,
              height: 120,
              background: '#2563eb',
              borderRadius: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 80,
              fontWeight: 900,
              marginBottom: 40,
              boxShadow: '0 20px 50px rgba(37, 99, 235, 0.3)',
            }}
          >
            R
          </div>
          
          {/* Main Title */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 900,
              color: 'white',
              letterSpacing: '-0.05em',
              lineHeight: 1,
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 15
            }}
          >
            Relocate <span style={{ color: '#2563eb' }}>Raleigh</span>
          </div>

          {/* Subtitle / Tagline */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: '#71717a',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            Keep your career. <span style={{ color: 'white', margin: '0 10px' }}>·</span> Upgrade your life.
          </div>
        </div>

        {/* Bottom Bar Indicator */}
        <div 
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 12,
            background: '#2563eb',
          }}
        />
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}

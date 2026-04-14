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

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          position: 'relative',
        }}
      >
        <div 
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            background: 'rgba(37, 99, 235, 0.2)',
            borderRadius: '100%',
            filter: 'blur(50px)',
          }}
        />
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 100,
              height: 100,
              backgroundColor: '#2563eb',
              borderRadius: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 64,
              fontWeight: 900,
              marginBottom: 32,
            }}
          >
            R
          </div>
          
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: 'white',
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}
          >
            Relocate <span style={{ color: '#2563eb' }}>Raleigh</span>
          </div>

          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: '#71717a',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            Keep your career. · Upgrade your life.
          </div>
        </div>

        <div 
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            backgroundColor: '#2563eb',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}

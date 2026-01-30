import { ImageResponse } from '@vercel/og';
import React from 'react';

export const config = {
    runtime: 'edge',
};

export default function handler(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        // ?title=<title>
        const title = searchParams.get('title')?.slice(0, 100) || 'Riffat Labs';
        const description = searchParams.get('description')?.slice(0, 100) || 'Premium Marketing Solutions';

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
                        backgroundColor: '#09090b', // Zinc-950
                        backgroundImage: 'radial-gradient(circle at 25px 25px, #27272a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #27272a 2%, transparent 0%)',
                        backgroundSize: '100px 100px',
                        color: 'white',
                        fontFamily: 'sans-serif',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #3f3f46', // Zinc-700
                            borderRadius: '20px',
                            padding: '40px 80px',
                            backgroundColor: 'rgba(9, 9, 11, 0.8)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        <div
                            style={{
                                fontSize: 60,
                                fontWeight: 900,
                                background: 'linear-gradient(to bottom right, #10b981, #34d399)', // Emerald gradient
                                backgroundClip: 'text',
                                color: 'transparent',
                                marginBottom: 20,
                                letterSpacing: '-0.05em',
                            }}
                        >
                            RIFFAT LABS
                        </div>
                        <div
                            style={{
                                fontSize: 40,
                                fontWeight: 700,
                                color: '#f4f4f5', // Zinc-100
                                marginBottom: 10,
                                textAlign: 'center',
                                lineHeight: 1.2,
                            }}
                        >
                            {title}
                        </div>
                        <div
                            style={{
                                fontSize: 24,
                                color: '#a1a1aa', // Zinc-400
                                textAlign: 'center',
                                maxWidth: '800px',
                            }}
                        >
                            {description}
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            },
        );
    } catch (e) {
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}

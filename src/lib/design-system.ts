export const DESIGN_SYSTEM = {
    colors: {
        zinc950: '#09090b',
        blue500: '#3b82f6',
        amber400: '#fbbf24',
    },
    animation: {
        duration: {
            fast: 0.2,
            medium: 0.5,
            slow: 1.0,
        },
        ease: [0.25, 0.46, 0.45, 0.94] as const
    }
} as const;

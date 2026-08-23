import localFont from 'next/font/local';

/**
 * Brand typeface — Exo 2, from the licensed files supplied in
 * `src/fonts/exo2/` (converted to WOFF2 from the delivered OTF set; the
 * original OTF weight per family: Thin/ExtraLight/Light/Regular/Medium/
 * SemiBold/Bold/ExtraBold/Black, each with an italic). Self-hosted by
 * Next.js at build time — no runtime request, no external font host.
 *
 * Every weight is declared so `font-thin` through `font-black` and italics
 * all resolve to a real static instance instead of the browser's synthetic
 * bold/oblique. Exposed as a CSS variable rather than `.className` so both
 * `font-sans` and `font-display` in `tailwind.config.ts` can share it.
 */
export const exo2 = localFont({
  src: [
    { path: '../fonts/exo2/Exo2-Thin.woff2', weight: '100', style: 'normal' },
    { path: '../fonts/exo2/Exo2-ThinItalic.woff2', weight: '100', style: 'italic' },
    { path: '../fonts/exo2/Exo2-ExtraLight.woff2', weight: '200', style: 'normal' },
    { path: '../fonts/exo2/Exo2-ExtraLightItalic.woff2', weight: '200', style: 'italic' },
    { path: '../fonts/exo2/Exo2-Light.woff2', weight: '300', style: 'normal' },
    { path: '../fonts/exo2/Exo2-LightItalic.woff2', weight: '300', style: 'italic' },
    { path: '../fonts/exo2/Exo2-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/exo2/Exo2-Italic.woff2', weight: '400', style: 'italic' },
    { path: '../fonts/exo2/Exo2-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/exo2/Exo2-MediumItalic.woff2', weight: '500', style: 'italic' },
    { path: '../fonts/exo2/Exo2-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: '../fonts/exo2/Exo2-SemiBoldItalic.woff2', weight: '600', style: 'italic' },
    { path: '../fonts/exo2/Exo2-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../fonts/exo2/Exo2-BoldItalic.woff2', weight: '700', style: 'italic' },
    { path: '../fonts/exo2/Exo2-ExtraBold.woff2', weight: '800', style: 'normal' },
    { path: '../fonts/exo2/Exo2-ExtraBoldItalic.woff2', weight: '800', style: 'italic' },
    { path: '../fonts/exo2/Exo2-Black.woff2', weight: '900', style: 'normal' },
    { path: '../fonts/exo2/Exo2-BlackItalic.woff2', weight: '900', style: 'italic' },
  ],
  variable: '--font-exo2',
  display: 'swap',
});

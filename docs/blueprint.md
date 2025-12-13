# **App Name**: Drift Dynamic

## Core Features:

- Product Data Configuration: Load all editable product content (name, subtitle, description, theme color, mode, WebP URL, image URL) from a single JavaScript config object.
- Hero Background Animation: Use a single animated WebP file as the looping hero background, with smooth parallax effects on scroll.
- Product Navigation: Implement PREV/NEXT buttons to switch product data (WebP, text, color theme, dark/light mode) with fade transitions.
- Theme Toggle: Include a dark/light mode toggle in the navbar.
- Section Highlighting: Highlight active section in the navigation bar as the user scrolls.
- WebP availability tool: When the user uploads a static or animated image, decide if the image would perform better as a static or animated webp to offer the optimal combination of speed, and fidelity to the end user.
- Loading Screen: Show a full-screen loading overlay until the animated WebP is ready, then smoothly fade into the hero section.

## Style Guidelines:

- Dark mode background: Charcoal (#222222) for a near-black aesthetic.
- Dark mode text: Light gray (#DDDDDD) for readability on dark backgrounds.
- Light mode background: Off-white (#F8F8F8) for a clean look.
- Light mode text: Dark gray (#333333) for contrast on light backgrounds.
- Accent color: To be set from the JavaScript config object (e.g., '#2AA8FF') for CTAs, highlights, and active indicators.
- Headline font: 'Poppins' (geometric sans-serif) for large headings and the product name.
- Body font: 'PT Sans' (humanist sans-serif) for all other content.
- Minimal monochrome social icons that adapt to the current theme.
- Full-screen hero section with parallax effect on the animated WebP background.
- Smooth fade transitions when switching between product data.
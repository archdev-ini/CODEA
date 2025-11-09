# Styling & Theming Guide

This document outlines the core principles and technologies used for styling the CODEA web application. Understanding these concepts is essential for maintaining a consistent and scalable visual identity.

## Core Technologies

The styling is built on a modern, utility-first foundation:

1.  **Tailwind CSS**: The primary framework for styling. We use its utility classes directly in the markup to build designs without writing custom CSS. All styles should be achievable through Tailwind utilities where possible. The configuration is in `tailwind.config.ts`.

2.  **ShadCN UI**: Our component library, built on top of Tailwind CSS and Radix UI. It provides a set of reusable, accessible, and themeable components (e.g., `Button`, `Card`, `Input`). These components are the building blocks of our UI. They are located in `src/components/ui`.

3.  **CSS Variables for Theming**: The entire color system, as well as properties like border-radius, are controlled by CSS variables defined in `src/app/globals.css`. This is the central location for defining the visual theme. ShadCN components are configured to use these variables, ensuring that a change in `globals.css` propagates throughout the entire application.

## Theming & Colors

The application's theme is defined in `src/app/globals.css` within the `:root` block. It uses HSL (Hue, Saturation, Lightness) values for colors, which makes it easy to create a consistent color palette.

Key color variables include:
- `--background`: The main page background color.
- `--foreground`: The main text color.
- `--primary`: The primary accent color for buttons, links, and important UI elements.
- `--secondary`: A secondary color for less prominent elements.
- `--card`: The background color for card-like components.
- `--accent`: A color for hover states and subtle highlights.
- `--destructive`: The color used for error states and destructive actions.

### Dark Mode

Dark mode is supported out-of-the-box. The styles for it are defined under the `.dark` class in `src/app/globals.css`. When the `dark` class is applied to the `<html>` element, these variables override the default `:root` variables.

## Typography

- **Font**: The primary font for the application is **Inter**, which is loaded from Google Fonts in `src/app/layout.tsx`.
- **Configuration**: The `fontFamily` is configured in `tailwind.config.ts`, mapping `font-body` and `font-headline` to the Inter font stack.

## Custom UI Components

While we rely heavily on ShadCN, the application also includes a few custom, high-impact UI components located in `src/components/ui`. These often have their own dedicated CSS files for more complex styles that are not easily achieved with Tailwind alone.

Examples include:
- `SpotlightCard.tsx` / `SpotlightCard.css`: A card with a spotlight effect on hover.
- `ScrollFloat.tsx` / `ScrollFloat.css`: A text animation effect on scroll.
- `GradientText.tsx` / `GradientText.css`: For creating animated gradient text.

When creating new components, the preference is always:
1.  Compose existing ShadCN components.
2.  Style with Tailwind utilities.
3.  If necessary, create a new component with its own CSS file for complex, isolated styles.

By adhering to this structure, we ensure the UI remains consistent, maintainable, and easy to theme.

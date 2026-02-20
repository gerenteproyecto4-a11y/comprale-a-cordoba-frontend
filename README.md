# Cómprale a Córdoba - Frontend

A React + Vite web application connecting buyers with local businesses from the Córdoba department of Colombia. The platform showcases sellers, their products, and supports local commerce.

## Prerequisites

- **Node.js** >= 18

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Runs at [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Environment Variables

No environment variables are required.

## Project Structure

```
src/
├── components/
│   ├── Footer/          # Footer with sponsors
│   ├── Hero/            # Landing hero section
│   ├── HowItWorks/      # Step-by-step guide section
│   ├── Navbar/          # Navigation bar with dual-tab search and cart
│   ├── SellerDetail/    # Seller detail modal component
│   ├── SellerSection/   # Seller cards carousel section
│   └── Stats/           # Impact statistics section
├── data/
│   └── mockData.js      # Mock sellers, stats and sponsors data
├── pages/
│   ├── HomePage.jsx     # Main landing page
│   └── SellerDetailPage.jsx  # Full seller detail page (/seller/:id)
├── App.jsx              # Router and top-level component
├── index.css            # Global CSS variables and base styles
└── main.jsx             # Entry point
```

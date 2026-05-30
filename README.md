# Internet Intelligence Engine

## Problem

Companies generate large amounts of public information scattered across multiple sources.

## Solution

Internet Intelligence Engine aggregates public web signals and converts them into structured business intelligence.

## Features

- Company search
- Business intelligence extraction
- Competitor detection
- Growth signal analysis
- Risk signal analysis
- Sentiment scoring
- Source aggregation
- Responsive dashboard

## Tech Stack

- Next.js
- TypeScript
- TailwindCSS
- Anakin API

## Architecture

```text
User Query
  |
  v
Search API
  |
  v
Intelligence Engine
  |
  v
Signal Extraction
  |
  v
Dashboard
```

## Screenshots

Add screenshots here.

## Future Improvements

- Real-time news feeds
- Historical trend tracking
- AI-generated reports
- Export to PDF

## Setup

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env.local
```

Set your Anakin API key:

```bash
ANAKIN_API_KEY=your_api_key_here
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

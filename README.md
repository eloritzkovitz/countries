# Countries Explorer

A fully-configurable country explorer built with React, Vite, and TypeScript.  
All country, currency, user and overlay data sources are **generic, config-driven and environment-configurable**, loaded from JSON files.  
Supports user-defined overlays, flexible filters, and easy data extension for any dataset.

## Features

- Interactive world map with overlays (such as visited countries, etc.)
- View detailed country information 
- An interactive flag guessing game
- Configurable filters (region, subregion, overlays)
- All data sources loaded from JSON files via environment variables
- Easily swap or edit data/configs without rebuilding
- **Import and export overlays directly from the UI for backup, sharing, or migration**

## Data Sources

All main data sources are loaded from JSON files in the `public/data` folder.  
You can change their location or swap datasets by editing the `.env` file.

| Data Type        | Default Path                | Env Variable                    |
|------------------|----------------------------|----------------------------------|
| Map GeoJSON      | `/data/countries.geojson`   | `VITE_MAP_GEO_URL`              |
| Countries        | `/data/countries.json`      | `VITE_COUNTRY_DATA_URL`         |
| Currencies       | `/data/currencies.json`     | `VITE_CURRENCY_DATA_URL`        |
| Overlays         | `/data/overlays.json`       | `VITE_OVERLAYS_CONFIG_URL`      |

> **Overlay Example:**
> ```json
> {
>   "id": "visited",
>   "name": "Visited",
>   "color": "rgba(76, 175, 80, 0.5)",
>   "tooltip": "Visited",
>   "visible": true,
>   "countries": ["IL"]
> }
> ```

## Customizing Data & Overlays

1. **Edit JSON files in `public/data`**  
   - Example: Add your own overlays or update country lists in `overlays.json`

2. **Update `.env` to point to your data files**  
   - No code changes needed—just edit the paths.

3. **Overlays are config-driven**  
   - Each overlay in `overlays.json` can have its own color, tooltip, and country list.

4. **Import/Export overlays via the UI**  
   - Use the overlay manager panel to backup, restore, or share overlays as JSON files.

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the dev server**
   ```bash
   npm run dev
   ```

3. **Edit `.env` and `public/data/*.json` to customize your data**

## Project Structure

```
src/
  components/      # UI components
  config/          # Filter and overlay configs
  context/         # React context providers
  hooks/           # Custom React hooks
  pages/           # App pages
  types/           # TypeScript types
  utils/           # Utility functions
public/
  data/            # All JSON data sources
```

## Extending & Contributing

- Add or edit overlays and country lists in `public/data/overlays.json`
- Add new filters by editing `src/config/filtersConfig.ts`
- All data sources are generic—just swap JSON files and update `.env`
- Use the overlay manager panel to import/export overlays for backup or sharing

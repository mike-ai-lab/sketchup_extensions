# Utilities Search & Filtering Guide

## Overview
The Utilities page now includes powerful search and filtering capabilities to help users quickly find the tools they need.

## Features

### 1. Search Bar
**Location**: Top of the utilities grid  
**Functionality**: Real-time search as you type  
**Searches**: 
- Utility title
- Utility description

**Example Searches**:
- "delete" → Shows Delete Tool
- "layer" → Shows Layer Manager
- "export" → Shows LSP Exporter
- "measure" → Shows Quick Measure

### 2. Category Filter
**Options**: All, Modeling, Organization, Export, Measurement  
**Behavior**: Click to filter by category  
**Visual**: Active category has filled button style

**Categories Breakdown**:
- **Modeling** (4): Quick Align, Array Tools, Rotate Helper, Delete Tool
- **Organization** (1): Layer Manager
- **Export** (1): LSP Exporter
- **Measurement** (1): Quick Measure

### 3. Price Filter
**Options**: All, Free, Paid  
**Behavior**: Click to filter by price  
**Visual**: Active filter has filled button style

**Price Breakdown**:
- **Free** (5): Quick Align, Layer Manager, Rotate Helper, Quick Measure, Delete Tool
- **Paid** (2): Array Tools ($9), LSP Exporter ($15)

### 4. Availability Filter
**Button**: "Available Only"  
**Behavior**: Toggle on/off  
**Shows**: Only utilities with downloadable files

**Currently Available**:
- Delete Tool ✓

**Coming Soon**:
- All other utilities (files not yet uploaded)

### 5. Results Counter
**Location**: Right side of filter bar  
**Shows**: Number of utilities matching current filters  
**Updates**: Real-time as filters change

## How Filtering Works

### Combined Filters
All filters work together (AND logic):
- Search + Category + Price + Availability
- Example: "Free" + "Modeling" + "Available Only" = Delete Tool only

### Filter Priority
1. **Search** - Filters by text match first
2. **Category** - Then filters by category
3. **Price** - Then filters by price
4. **Availability** - Finally filters by download availability

### No Results State
When no utilities match the filters:
- Shows "No utilities found matching your filters" message
- Displays "Clear Filters" button
- Clicking "Clear Filters" resets all filters to default

## User Experience

### Real-time Updates
- All filters update instantly (no page reload)
- Results counter updates immediately
- Grid re-renders smoothly

### Visual Feedback
- Active filters have filled button style
- Inactive filters have outline style
- Available utilities show green badge
- Hover effects on all interactive elements

### Mobile Responsive
- Filters wrap on smaller screens
- Search bar full width on mobile
- Filter buttons stack vertically if needed

## Use Cases

### Find Free Tools
1. Click "Free" price filter
2. See 5 free utilities

### Find Available Downloads
1. Click "Available Only" button
2. See only Delete Tool (currently)

### Find Modeling Tools
1. Click "Modeling" category
2. See 4 modeling utilities

### Search for Specific Tool
1. Type "delete" in search
2. See Delete Tool only

### Complex Filter
1. Select "Modeling" category
2. Select "Free" price
3. Click "Available Only"
4. Result: Delete Tool (only free modeling tool available)

## Developer Notes

### Adding New Utilities
When adding new utilities, ensure:
- `category` matches one of: "Modeling", "Organization", "Export", "Measurement"
- `price` is either "Free" or "$X" format
- `downloadUrl` is set to file path or `null`

### Filter Logic
Located in `client/src/pages/UtilitiesDetail.tsx`:
```typescript
const filteredUtilities = useMemo(() => {
  return utilities.filter(utility => {
    const matchesSearch = ...
    const matchesCategory = ...
    const matchesPrice = ...
    const matchesAvailability = ...
    return matchesSearch && matchesCategory && matchesPrice && matchesAvailability;
  });
}, [searchQuery, selectedCategory, selectedPrice, showAvailableOnly, utilities]);
```

### Performance
- Uses `useMemo` hook for efficient filtering
- Only re-filters when dependencies change
- No unnecessary re-renders

## Future Enhancements

Potential additions:
- Sort by: Name, Price, Category
- Filter by: SketchUp version compatibility
- Tags system for more granular filtering
- Save filter preferences
- URL parameters for shareable filtered views

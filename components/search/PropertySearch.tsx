'use client';

export function PropertySearch() {
  // Placeholder - filters: city, district, propertyType, priceRange, bedrooms, area, rent/sale
  return (
    <form data-testid="property-search" role="search">
      <input type="hidden" name="listingType" defaultValue="sale" />
      {/* Filters will be implemented with React Hook Form + Zod */}
    </form>
  );
}

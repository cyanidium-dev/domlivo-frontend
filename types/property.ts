export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  city: string;
  district: string | null;
  propertyType: string;
  features: string[];
  gallery: PropertyImage[];
  agent: PropertyAgent;
  locationTags: LocationTag[];
  createdAt: string;
}

export interface PropertyImage {
  _key: string;
  asset: {
    _ref: string;
    _type: string;
  };
  alt?: string;
}

export interface PropertyAgent {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

export interface LocationTag {
  id: string;
  name: string;
}

// types.ts (or where you define your types)

export interface IProduct {
    _id: string;
    title: string;
    description: string;
    shortDescription: string;
    price: number;
    oldPrice?: number;
    dicountPercentage?: number;
    tag?: string;
    tags?: string[];
    productImage: SanityImageSource;
    productImage1?: SanityImageSource;
    productImage2?: SanityImageSource;
    productImage3?: SanityImageSource;
    reviews?: SanityReference[]; // Assuming you have SanityReference defined
    rating?: number;
    customerReview?: number;
    availableSizes?: string[];
    availableColors?: string[];
    defaultSize?: string;
    defaultColor?: string;
    SKU?: string;
    categories: string[]; // Changed to an array of strings
    isNew?: boolean;
    tranding?: boolean;
    features?:{
      salesPackage: string;
      modelNumber: string;
      secondaryMaterial: string;
      configuration: string;
      upholsteryMaterial: string;
      upholsteryColor: string;
      fillingMaterial: string;
      finishType: string;
      adjustableHeadrest: string;
      maximumLoadCapacity: string;
      originOfManufacture: string;
      width: string;
      height: string;
      depth: string;
      weight: string;
      seatHeight: string;
      legHeight: string;
      warrantySummary: string;
      warrantyServiceType: string;
      coveredInWarranty: string;
      notCoveredInWarranty: string;
      domesticWarranty: string;
    };
    // ... other fields
  }
  
  // You'll also need to define SanityImageSource and SanityReference if you haven't already:
  
  export interface SanityImageSource {
    _type: "image";
    asset: SanityReference;
  }
  
  export interface SanityReference {
    _ref: string;
    _type: "reference";
  }
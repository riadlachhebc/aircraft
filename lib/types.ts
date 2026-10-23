export type CategoryId =
  | "air-conditioners"
  | "heating"
  | "fans-air-circulators"
  | "air-quality"
  | "energy-efficiency";

export interface CategoryInfo {
  id: CategoryId;
  slug: string;
  name: string;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  editorialSummary: string;
  keyTopics: string[];
  standardsBodies: string[];
}

export type ContentStatus = "draft" | "published" | "archived";

export type ArticleType =
  | "review"
  | "comparison"
  | "buying-guide"
  | "problem-solver"
  | "informational";

export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  experienceYears?: number;
  credentials?: string;
  avatarUrl?: string;
}

export interface ArticleFaq {
  question: string;
  answer: string;
}

export interface SourceCitation {
  title: string;
  publisher: string;
  url: string;
  publishedYear?: number;
  notes?: string;
}

export interface ComparisonTableRow {
  criteria: string;
  optionA: string;
  optionB: string;
  verdict: string;
}

export interface Article {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  primaryIntent: string;
  categoryId: CategoryId;
  authorId: string;
  reviewerId?: string;
  status: ContentStatus;
  publishedAt: string;
  updatedAt: string;
  readTimeMinutes: number;
  heroImage: string;
  heroImageAlt: string;
  directAnswer: string;
  keyTakeaways: string[];
  limitations: string[];
  articleType?: ArticleType;
  primaryKeyword?: string;
  searchIntent?: string;
  productIds?: string[];
  primaryProductId?: string;
  comparedProductIds?: string[];
  verdict?: string;
  testedPersonally?: boolean;
  testingMethodologyDistinction?: string;
  verdictSummary?: {
    ratingLabel?: string;
    bottomLine: string;
    idealBuyer: string;
    avoidIf: string;
  };
  comparisonTable?: {
    caption: string;
    optionAName: string;
    optionBName: string;
    rows: ComparisonTableRow[];
  };
  contentSections: {
    heading: string;
    level?: 2 | 3;
    bodyMarkdown: string;
  }[];
  sources: SourceCitation[];
  faqs?: ArticleFaq[];
  relatedArticleSlugs: string[];
  relatedProductSlugs?: string[];
  isFeatured?: boolean;
}

export type EvidenceType =
  | "manufacturer-spec"
  | "independent-consensus"
  | "editorial-analysis"
  | "energy-calc";

export interface ProductSpec {
  name: string;
  value: string;
  verifiedSource: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  manufacturer: string;
  brand?: string;
  modelNumber: string;
  categoryId: CategoryId;
  status: ContentStatus;
  officialUrl: string;
  retailerUrls?: { merchant: string; url: string }[];
  approximateUsdPrice: number;
  priceVerifiedDate: string;
  coolingCapacityBtuSacc?: number;
  coolingCapacityBtuAshrae?: number;
  heatingCapacityWatts?: number;
  cadrSmoke?: number;
  cadrDust?: number;
  cadrPollen?: number;
  airFlowCfm?: number;
  recommendedRoomSqFt: number;
  roomSizeBasis: string;
  powerConsumptionWatts: number;
  operatingCostEstimateMonthly?: number;
  voltageFrequency: string;
  noiseDbRange: string;
  noiseConditions: string;
  energyEfficiencyRating?: string;
  dimensionsInches: { width: number; depth: number; height: number };
  weightLbs: number;
  installationRequirements: string;
  maintenanceSchedule: string;
  replacementPartsCostEstimate?: string;
  warrantyYears: number;
  certifications: string[];
  pros: string[];
  cons: string[];
  bestFor: string;
  targetAudience?: string;
  editorialLimitations: string;
  evidenceType: EvidenceType;
  affiliateSlug?: string;
  affiliateUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageUsagePermission?: string;
  specSources?: SourceCitation[];
  reviewArticleSlug?: string;
}

export interface AffiliateRedirect {
  slug: string;
  productId: string;
  productName: string;
  merchant: string;
  destinationUrl: string;
  isActive: boolean;
  lastVerifiedDate: string;
  disclosureNotice: string;
}

export interface CalculatorState {
  watts: number;
  hoursPerDay: number;
  costPerKwh: number;
  days: number;
  dutyCyclePercent: number;
}

export interface CalculatorResults {
  dailyKwhEffective: number;
  dailyCost: number;
  periodKwh: number;
  periodCost: number;
  seasonKwh: number;
  seasonCost: number;
  annualKwh: number;
  annualCost: number;
}

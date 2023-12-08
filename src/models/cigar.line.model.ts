export interface CigarLine {
    ProductId: any
    LineId: number
    Name: string
    Description: string
    CanonicalUrl: string
    AdUrl: string
    ImageUrl: string
    ImageUrlSmall: string
    UserImageUrl: any
    ImageOfSingleUrl: any
    ImageOfSingleWidth: any
    ImageOfSingleHeight: any
    RatingSummary: RatingSummary
    MinBoxQty: any
    MaxBoxQty: any
    Prices: Prices
    PartnerPrices: PartnerPrices
    NeptunePrices: NeptunePrices
    Attributes: Attributes
    IsCustom: any
    CustomUserId: any
    CustomUUID: any
    SocialPosts: number
    AdditionalAttributes: any[]
    Images: any[]
    Tags: Tag[]
    Shapes: Shape[]
    BandHistory: BandHistory[]
    RelatedLines: any[]
    MyRating: any
    MyNote: any
    MyCigarFeatures: any
    Aux: Aux
  }
  
  export interface RatingSummary {
    AverageRating: number
    RatingCount: number
    Rated5: number
    Rated4: number
    Rated3: number
    Rated2: number
    Rated1: number
  }
  
  export interface Prices {
    SinglePriceMin: number
    SinglePriceMax: number
    BoxPriceMin: number
    BoxPriceMax: number
    DisplayPartnerPrices: any
  }
  
  export interface PartnerPrices {
    PartnerSinglePriceMin: any
    PartnerSinglePriceMax: any
    PartnerBoxPriceMin: any
    PartnerBoxPriceMax: any
  }
  
  export interface NeptunePrices {
    NeptuneSinglePriceMin: any
    NeptuneSinglePriceMax: any
    NeptuneBoxPriceMin: any
    NeptuneBoxPriceMax: any
    DisplayNeptunePrices: boolean
  }
  
  export interface Attributes {
    ManufacturerValueId: any
    StrengthValueId: number
    OriginValueId: number
    WrapperValueId: number
    BinderValueId: number
    FillerValueId: number
    RollingTypeValueId: number
    WrapperColorValueId: number
    Manufacturer: any
    ManufacturerDescription: any
    Origin: any
    OriginDescription: string
    Strength: any
    Wrapper: any
    WrapperDescription: string
    WrapperColor: any
    WrapperColorDescription: string
    Binder: any
    BinderDescription: string
    Filler: any
    FillerDescription: string
    RollingType: any
    RollingTypeDescription: string
    RingGauge: any
    RingGaugeDescription: any
    Length: any
    LengthDescription: any
    Section: any
    Shape: any
    ShapeDescription: any
    SinglePackaging: any
    IsSpecific: any
    MasterLine: any
    CARating: any
    CIRating: any
  }
  
  export interface Tag {
    Tag: string
    Weight: number
  }
  
  export interface Shape {
    Id: number
    LineId: number
    Name: string
    ImageUrl: string
    ImageUrlSmall: string
    ImageOfSingleUrl?: string
    ImageOfSingleWidth?: number
    ImageOfSingleHeight?: number
    Attributes: Attributes2
    Rating: Rating
    Prices: Prices2
    PartnerPrices: PartnerPrices2
    MinBoxQty: number
    MaxBoxQty: number
    AdditionalAttributes: AdditionalAttribute[]
  }
  
  export interface Attributes2 {
    Length: string
    Shape?: string
    RingGauge: number
    CARating: any
    CIRating?: number
  }
  
  export interface Rating {
    AverageRating: number
    RatingCount: number
  }
  
  export interface Prices2 {
    SinglePrice: number
    BoxPriceMin: number
    BoxPriceMax: number
    DisplayPartnerPrices: any
  }
  
  export interface PartnerPrices2 {
    PartnerSinglePrice: any
    PartnerBoxPriceMin: any
    PartnerBoxPriceMax: any
  }
  
  export interface AdditionalAttribute {
    Id: number
    AttributeId: number
    AttributeName: string
    ProductId: number
    LineId: number
    Value: string
    Info: string
  }
  
  export interface BandHistory {
    ImageUrl: string
    ImageType: string
    Order: number
  }
  
  export interface Aux {
    ShippingDate: string
    ShippingCutOffTime: string
    Availabilities: any[]
    RatingSummaries: RatingSummary2[]
  }
  
  export interface RatingSummary2 {
    ProductId: number
    LineId: number
    DrawRating: number
    AppearanceRating: number
    BurnRating: number
    AromaRating: number
    TasteRating: number
  }
  
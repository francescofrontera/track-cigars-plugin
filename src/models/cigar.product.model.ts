export interface CigarProduct {
    ProductId: number
    LineId: number
    Name: string
    Description: string
    CanonicalUrl: string
    AdUrl: string
    ImageUrl: string
    ImageUrlSmall: string
    UserImageUrl: any
    ImageOfSingleUrl: string
    ImageOfSingleWidth: number
    ImageOfSingleHeight: number
    RatingSummary: RatingSummary
    MinBoxQty: number
    MaxBoxQty: number
    Prices: Prices
    PartnerPrices: PartnerPrices
    NeptunePrices: NeptunePrices
    Attributes: Attributes
    IsCustom: boolean
    CustomUserId: any
    CustomUUID: any
    SocialPosts: number
    AdditionalAttributes: any[]
    Images: Image[]
    Tags: Tag[]
    Shapes: any[]
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
    NeptuneSinglePriceMin: number
    NeptuneSinglePriceMax: number
    NeptuneBoxPriceMin: number
    NeptuneBoxPriceMax: number
    DisplayNeptunePrices: boolean
  }
  
  export interface Attributes {
    ManufacturerValueId: number
    StrengthValueId: number
    OriginValueId: number
    WrapperValueId: number
    BinderValueId: number
    FillerValueId: number
    RollingTypeValueId: number
    WrapperColorValueId: number
    Manufacturer: string
    ManufacturerDescription: string
    Origin: string
    OriginDescription: string
    Strength: string
    Wrapper: string
    WrapperDescription: string
    WrapperColor: string
    WrapperColorDescription: string
    Binder: string
    BinderDescription: string
    Filler: string
    FillerDescription: string
    RollingType: string
    RollingTypeDescription: string
    RingGauge: number
    RingGaugeDescription: string
    Length: string
    LengthDescription: string
    Section: string
    Shape: string
    ShapeDescription: string
    SinglePackaging: string
    IsSpecific: boolean
    MasterLine: string
    CARating: any
    CIRating: any
  }
  
  export interface Image {
    Id: number
    ImageUrl: string
    Width: number
    Height: number
  }
  
  export interface Tag {
    Tag: string
    Weight: number
  }
  
  export interface BandHistory {
    ImageUrl: string
    ImageType: string
    Order: number
  }
  
  export interface Aux {
    ShippingDate: string
    ShippingCutOffTime: string
    Availabilities: Availability[]
    RatingSummaries: RatingSummary2[]
  }
  
  export interface Availability {
    ProductId: number
    AvailablePcs: number
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
  
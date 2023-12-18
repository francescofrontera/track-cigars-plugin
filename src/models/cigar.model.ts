export interface Cigar {
    ProductId: number
    LineId: number
    Name: string
    ProductName: string
    LineName: string
    ImageUrl: string
    Rating: Rating
    ScansCount: number
    Prices: Prices
    Attributes: Attributes
  }
  
  export interface Rating {
    AverageRating: number
    RatingCount: number
  }
  
  export interface Prices {
    SinglePriceMin: number
    SinglePriceMax: number
    BoxPriceMin: number
    BoxPriceMax: number
    DisplayPartnerPrices: number
  }
  
  export interface Attributes {
    ShapeId: string
    Shape: string
    SectionId: string
    Section: string
    OriginId: number
    Origin: string
    WrapperId: number
    Wrapper: string
    WrapperColorId: number
    WrapperColor: string
    StrengthId: number
    Strength: string
    LengthId: string
    Length: number
    RingGauge: number
  }
  
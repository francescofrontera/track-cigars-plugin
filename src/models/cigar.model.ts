export interface Cigar {
    ProductId: any
    LineId: number
    Name: string
    ProductName: any
    LineName: string
    ImageUrl: string
    Rating: Rating
    ScansCount: number
    Prices: Prices
    Attributes: Attributes
    LogId: any
    List: any
    InLists: any
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
    DisplayPartnerPrices: any
  }
  
  export interface Attributes {
    ShapeId: any
    Shape: any
    SectionId: any
    Section: any
    OriginId: number
    Origin: string
    WrapperId: number
    Wrapper: string
    WrapperColorId: number
    WrapperColor: string
    StrengthId: number
    Strength: string
    LengthId: any
    Length: any
    RingGauge: any
  }
  
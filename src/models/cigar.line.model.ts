export interface CigarLine {
	ProductId: any;
	LineId: number;
	Name: string;
	Description: string;
	CanonicalUrl: string;
	AdUrl: string;
	ImageUrl: string;
	ImageUrlSmall: string;
	UserImageUrl: string;
	ImageOfSingleUrl: string;
	ImageOfSingleWidth: number;
	ImageOfSingleHeight: number;
	Shapes: Shape[];
}

export interface Shape {
	Id: number;
	LineId: number;
	Name: string;
	ImageUrl: string;
	ImageUrlSmall: string;
	ImageOfSingleUrl?: string;
	ImageOfSingleWidth?: number;
	ImageOfSingleHeight?: number;
	Attributes: Attributes2;
	Rating: Rating;
	Prices: Prices2;
	PartnerPrices: PartnerPrices2;
	MinBoxQty: number;
	MaxBoxQty: number;
	AdditionalAttributes: AdditionalAttribute[];
}

export interface Attributes2 {
	Length: string;
	Shape?: string;
	RingGauge: number;
	CARating: number;
	CIRating?: number;
}

export interface Rating {
	AverageRating: number;
	RatingCount: number;
}

export interface Prices2 {
	SinglePrice: number;
	BoxPriceMin: number;
	BoxPriceMax: number;
	DisplayPartnerPrices: number;
}

export interface PartnerPrices2 {
	PartnerSinglePrice: number;
	PartnerBoxPriceMin: number;
	PartnerBoxPriceMax: number;
}

export interface AdditionalAttribute {
	Id: number;
	AttributeId: number;
	AttributeName: string;
	ProductId: number;
	LineId: number;
	Value: string;
	Info: string;
}

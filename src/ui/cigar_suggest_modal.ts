import { App, SuggestModal } from "obsidian";
import { Cigar } from "@models/cigar.model";

export class CigarSuggestModal extends SuggestModal<Cigar> {
	constructor(
		app: App,
		private readonly suggestion: Cigar[],
		private onChoose: (result: Cigar) => void
	) {
		super(app);
	}

	// Returns all available suggestions.
	getSuggestions(query: string): Cigar[] {
		return this.suggestion.filter(cigar => {
            const searchQuery = query?.toLowerCase();
            return(
                cigar.Name.toLowerCase().includes(searchQuery) ||
                cigar.LineName.toLowerCase().includes(searchQuery)
            )
        })
	}

	// Renders each suggestion item.
	renderSuggestion(cigar: Cigar, el: HTMLElement) {
		const subtitle = `${cigar.Name}${cigar.LineName}${cigar.Rating.AverageRating}${cigar.Prices.SinglePriceMax}`;
		el.createEl("div", { text: cigar.Name });
		el.createEl("small", { text: subtitle });
	}

	// Perform action on the selected suggestion.
	onChooseSuggestion(cigar: Cigar) {
		this.onChoose(cigar);
	}

	onClose(): void {
		let { contentEl } = this;
		contentEl.empty();
	}
}

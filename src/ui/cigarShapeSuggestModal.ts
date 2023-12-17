import { App, SuggestModal } from "obsidian";
import { Shape } from "@models/cigar.line.model";

export class CigarShapeSuggestModal extends SuggestModal<Shape> {
	constructor(
		app: App,
		private readonly suggestion: Shape[],
		private onChoose: (result: Shape) => void
	) {
		super(app);
	}

	// Returns all available suggestions.
	getSuggestions(query: string): Shape[] {
		return this.suggestion.filter((shape) => {
			const searchQuery = query.toLowerCase();
			return (
				shape.Name.toLowerCase().includes(searchQuery) ||
				shape.Attributes.Length.toLowerCase().includes(searchQuery)
			);
		});
	}

	// Renders each suggestion item.
	renderSuggestion(s: Shape, el: HTMLElement) {
		const subtitle = s.Attributes.Shape ? `${s.Attributes.Shape}` : "";
		el.createEl("div", { text: s.Name });
		el.createEl("small", { text: subtitle });
	}

	// Perform action on the selected suggestion.
	onChooseSuggestion(shape: Shape) {
		this.onChoose(shape);
	}

	onClose(): void {
		const { contentEl } = this;
		contentEl.empty();
	}
}

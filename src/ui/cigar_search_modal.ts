import { Cigar } from "src/models/cigar.model";
import { App, ButtonComponent, Modal, Setting, TextComponent } from "obsidian";
import { CigarAPI } from "@apis/cigars";
import { either } from "fp-ts";
import { pipe } from "fp-ts/function";

export default class SearchModal extends Modal {
	private isBusy = false;
	private sCigarBtnRef?: ButtonComponent;

	constructor(
		app: App,
		private query: string,
		private readonly cigarAPI: CigarAPI,
		private callback: (err: Error | undefined, result: Cigar[]) => void
	) {
		super(app);
	}

	#setBusy(busy: boolean) {
		this.isBusy = busy;
		this.sCigarBtnRef?.setDisabled(busy);
		this.sCigarBtnRef?.setButtonText(busy ? "Searching cigar..." : "Search");
	}

	async #searchCigar() {
		if (!this.query) {
			this.callback(new Error("No query entered."), []) 
		}

		if (!this.isBusy) {
			this.#setBusy(true);
			await this.cigarAPI.getCigar(this.query).then((e) =>
				pipe(
					e,
					either.fold(
						(err) => this.callback(err, []),
						(v) => this.callback(undefined, v)
					)
				)
			);
			this.#setBusy(false);
			this.close();
		}
	}

	#submitEnterCallback(event: KeyboardEvent) {
		if (event.key === "Enter" && !event.isComposing) {
			this.#searchCigar();
		}
	}

	onOpen(): void {
		const { contentEl } = this;

		contentEl.createEl("h1", { text: "Search Cigar" });

		contentEl.createDiv(
			{ cls: "cigar-search-plugin__search-modal--input" },
			(settingItem) => {
				new TextComponent(settingItem)
					.setValue(this.query)
					.setPlaceholder("Partagas")
					.onChange((value) => (this.query = value))
					.inputEl.addEventListener(
						"keydown",
						this.#submitEnterCallback.bind(this)
					);
			}
		);

		new Setting(contentEl).addButton((btn) => {
			return (this.sCigarBtnRef = btn
				.setButtonText("Search by brand")
				.setCta()
				.onClick(() => this.#searchCigar()));
		});
	}

	onClose(): void {
		let { contentEl } = this;
		contentEl.empty();
	}
}

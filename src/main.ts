import { CigarAPI, CigarAPIImpl } from "@apis/cigars";
import { CigarFileAPI, CigarFileAPIImpl } from "@apis/file";
import { AdditionalAttribute, Shape } from "@models/cigar.line.model";
import { Cigar } from "@models/cigar.model";
import { CigarProduct } from "@models/cigar.product.model";
import SearchCigarsSettingsTab, {
	DEFAULT_SETTINGS,
	SearchCigarsSettings,
} from "@settings/searchSigarSetting";
import { CigarShapeSuggestModal } from "@ui/cigar_shape_suggest_modal";
import { CigarSuggestModal } from "@ui/cigar_suggest_modal";
import formatCigar from "@utils/formatter";
import { either, option } from "fp-ts";
import { Option } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/function";
import {
	Notice,
	Plugin,
	TFile,
} from "obsidian";
import SearchModal from "src/ui/cigar_search_modal";

// Remember to rename these classes and interfaces!

export default class SearchCigarsPlugin extends Plugin {
	settings: SearchCigarsSettings;
	cigarAPI: CigarAPI;
	cigarFileAPI: CigarFileAPI;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new SearchCigarsSettingsTab(this.app, this));

		this.cigarAPI = new CigarAPIImpl();
		this.cigarFileAPI = new CigarFileAPIImpl(this.app);

		this.addRibbonIcon("cigarette", "Search Cigar", () => {
			this.searchCigar();
		});

		this.addCommand({
			id: "search-sigar",
			name: "Search a cigar",
			callback: () => this.searchCigar(),
		});
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async searchCigar(): Promise<void> {
		const cigars = await this.openCigarSearchModal();
		const selectedCigar = await this.openCigarSuggestModal(cigars);
		const shape = await this.openCigarShapeSuggestModal(
			selectedCigar.LineId
		);
		const product = await this.retriveProduct(shape.AdditionalAttributes);
		const cigarAsMD = await formatCigar(shape, product);
		const tfile = await this.cigarFileAPI.createCigarNote(
			this.settings.folder,
			shape.Name,
			cigarAsMD
		);

		pipe(
			tfile,
			either.match(
				(err) => {
					new Notice(
						`An Error occurred during note creation: ${err}`
					);
				},
				async (createdFile) => await this.openFile(createdFile)
			)
		);
	}

	async openFile(createdFile: TFile): Promise<void> {
		const activeLeaf = this.app.workspace.getLeaf();
		if (!activeLeaf) {
			console.warn("No active leaf");
			return;
		}

		await activeLeaf.openFile(createdFile, { state: { mode: "source" } });
		activeLeaf.setEphemeralState({ rename: "all" });

		new Notice(`Cigar file created: ${createdFile.path}!`);
	}

	async retriveProduct(
		attributes: AdditionalAttribute[]
	): Promise<Option<CigarProduct>> {
		if (attributes && attributes.length > 0) {
			const pId = attributes[0].ProductId;
			const getProduct = await this.cigarAPI.getCigarProduct(pId);
			return pipe(getProduct, option.fromEither);
		}

		return option.none;
	}

	// UI Actions
	async openCigarSearchModal(query = ""): Promise<Cigar[]> {
		return new Promise<Cigar[]>((resolve, reject) => {
			return new SearchModal(
				this.app,
				query,
				this.cigarAPI,
				(error, results) => {
					return error ? reject(error) : resolve(results);
				}
			).open();
		});
	}

	async openCigarSuggestModal(cigars: Cigar[]): Promise<Cigar> {
		return new Promise<Cigar>((resolve) => {
			return new CigarSuggestModal(this.app, cigars, (selectedCigar) =>
				resolve(selectedCigar)
			).open();
		});
	}

	async openCigarShapeSuggestModal(lineId: number): Promise<Shape> {
		const shapes = pipe(
			await this.cigarAPI.getCigarLine(lineId),
			either.fold(
				(_) => [] as Shape[],
				(v) => v.Shapes
			)
		);

		return new Promise<Shape>((resolve) => {
			return new CigarShapeSuggestModal(
				this.app,
				shapes,
				(selectedShape) => resolve(selectedShape)
			).open();
		});
	}
}

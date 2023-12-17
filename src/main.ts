import { getCigarLine, getCigarProduct } from "@apis/cigars";
import { Shape } from "@models/cigar.line.model";
import { Cigar } from "@models/cigar.model";
import SearchCigarsSettingsTab, {
	DEFAULT_SETTINGS,
	SearchCigarsSettings,
} from "@settings/searchSigarsSetting";
import { CigarShapeSuggestModal } from "@ui/cigarShapeSuggestModal";
import { CigarSuggestModal } from "@ui/cigarSuggestModal";
import { task as T, taskEither as TE } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import { App, Notice, Plugin, TFile } from "obsidian";
import SearchModal from "@ui/cigarSearchModal";
import { createCigarNote } from "@apis/file";
import { TaskEither } from "fp-ts/lib/TaskEither";
import shapeAndProductAsText from "@utils/text-formatter";
import { CigarProduct } from "@models/cigar.product.model";

export default class SearchCigarsPlugin extends Plugin {
	settings: SearchCigarsSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new SearchCigarsSettingsTab(this.app, this));

		this.addRibbonIcon("cigarette", "Search Cigar", () =>
			this.searchCigar()
		);

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
		const app = this.app;
		const folder = this.settings.folder;

		await pipe(
			this.openCigarSearchModal(app),
			TE.flatMap((cigars) => this.openCigarSuggestModal(app, cigars)),
			TE.flatMap((c) => this.openCigarShapeSuggestModal(app, c.LineId)),
			TE.flatMap((s) =>
				pipe(
					getCigarProduct(s.Id),
					TE.map((p) => [s, p])
				)
			),
			TE.flatMap(([s, p]) =>
				pipe(
					shapeAndProductAsText(s as Shape, p as CigarProduct),
					TE.flatMap((content) =>
						createCigarNote(app.vault, folder, s.Name, content)
					)
				)
			),
			TE.flatMap((f) => this.openFile(app, f)),
			TE.fold(
				(e) => {
					console.log(e);
					return T.of(new Notice(e.message));
				},
				(tFile) => {
					return T.of(new Notice(tFile.path));
				}
			)
		)();
	}

	openFile(app: App, createdFile: TFile): TaskEither<Error, TFile> {
		return TE.tryCatch(
			() => {
				const activeLeaf = app.workspace.getLeaf();

				if (!activeLeaf) throw Error("no leaft");

				return activeLeaf
					.openFile(createdFile, {
						state: { mode: "source" },
					})
					.then((_) =>
						activeLeaf.setEphemeralState({ rename: "all" })
					)
					.then(() => createdFile);
			},
			(reason) => new Error(String(reason))
		);
	}

	// UI Actions
	openCigarSearchModal(app: App, query = ""): TaskEither<Error, Cigar[]> {
		return TE.tryCatch(
			() =>
				new Promise<Cigar[]>((resolve, reject) => {
					return new SearchModal(app, query, (error, results) => {
						return error ? reject(error) : resolve(results);
					}).open();
				}),
			(reason) => new Error(String(reason))
		);
	}

	openCigarSuggestModal(app: App, cigars: Cigar[]): TaskEither<Error, Cigar> {
		return TE.tryCatch(
			() =>
				new Promise<Cigar>((resolve) => {
					return new CigarSuggestModal(app, cigars, (selectedCigar) =>
						resolve(selectedCigar)
					).open();
				}),
			(reason) => new Error(String(reason))
		);
	}

	openCigarShapeSuggestModal(
		app: App,
		lineId: number
	): TaskEither<Error, Shape> {
		return pipe(
			getCigarLine(lineId),
			TE.flatMap((cLine) => {
				return TE.tryCatch(
					() =>
						new Promise<Shape>((resolve) => {
							return new CigarShapeSuggestModal(
								app,
								cLine.Shapes,
								(selectedShape) => resolve(selectedShape)
							).open();
						}),
					(reason) => new Error(String(reason))
				);
			})
		);
	}
}

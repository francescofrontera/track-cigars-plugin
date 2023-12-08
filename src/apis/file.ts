import { either, taskEither } from "fp-ts";
import { Either } from "fp-ts/lib/Either";
import { App, Notice, TFile } from "obsidian";

const FILE_EXTENSION: string = "md";

export interface CigarFileAPI {
	createCigarNote(
		filePath: String,
		name: string,
		renderContent: string
	): Promise<Either<Error, TFile>>;

	openCigarFile(fileToOpen: TFile): Promise<Either<Error, TFile>>;
}

export class CigarFileAPIImpl implements CigarFileAPI {
	private readonly app: App;

	constructor(app: App) {
		this.app = app;
	}
	openCigarFile(fileToOpen: TFile): Promise<either.Either<Error, TFile>> {
		return taskEither.tryCatch(
			async () => {
				const activeLeaf = this.app.workspace.getLeaf();
				if (!activeLeaf) {
					console.warn("No active leaf");
					return fileToOpen;
				}

				await activeLeaf.openFile(fileToOpen, {
					state: { mode: "source" },
				});
				activeLeaf.setEphemeralState({ rename: "all" });

				return fileToOpen;
			},
			(reason) => new Error(String(reason))
		)();
	}

	createCigarNote(
		filePath: String,
		name: string,
		renderContent: string
	): Promise<either.Either<Error, TFile>> {
		const fileDate = new Date().toLocaleDateString().replaceAll("/", "-");
		const fileName = name.trim();
		const completePath = `${filePath}/${fileName}_${fileDate}.${FILE_EXTENSION}`;

		return taskEither.tryCatch(
			() => this.app.vault.create(completePath, renderContent),
			(reason) => new Error(String(reason))
		)();
	}
}

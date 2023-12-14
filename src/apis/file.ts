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
}

export class CigarFileAPIImpl implements CigarFileAPI {
	private readonly app: App;

	constructor(app: App) {
		this.app = app;
	}

	createCigarNote(
		filePath: String,
		name: string,
		renderContent: string
	): Promise<either.Either<Error, TFile>> {
		const fileDate = Date.now();
		const fileName = name.trim();
		const completePath = `${filePath}/${fileName}_${fileDate}.${FILE_EXTENSION}`;

		return taskEither.tryCatch(
			() => this.app.vault.create(completePath, renderContent),
			(reason) => new Error(String(reason))
		)();
	}
}

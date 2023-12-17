import { taskEither as TE } from "fp-ts";
import { TaskEither } from "fp-ts/lib/TaskEither";
import { TFile, Vault } from "obsidian";

const FILE_EXTENSION = "md";

export function createCigarNote(
	vault: Vault,
	filePath: string,
	name: string,
	renderContent: string
): TaskEither<Error, TFile> {
	const fileDate = Date.now();
	const fileName = name.trim();
	const completePath = `${filePath}/${fileName}_${fileDate}.${FILE_EXTENSION}`;

	console.log("The path", completePath);
	return TE.tryCatch(
		() => vault.create(completePath, renderContent),
		(reason) => new Error(String(reason))
	);
}

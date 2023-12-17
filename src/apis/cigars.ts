import { CigarLine } from "@models/cigar.line.model";
import { Cigar } from "@models/cigar.model";
import { CigarProduct } from "@models/cigar.product.model";
import { taskEither as TE } from "fp-ts";
import { Either } from "fp-ts/lib/Either";
import { TaskEither } from "fp-ts/lib/TaskEither";
import { RequestUrlParam, requestUrl } from "obsidian";

export function getCigarProduct(
	productId: number
): TaskEither<Error, CigarProduct> {
	const retrieveCigarProduct = httpCall<CigarProduct>({
		url: `https://api.cigarscanner.com/api/cigars/products/${productId}`,
		method: "GET",
		contentType: "application/json",
	});

	return retrieveCigarProduct;
}

export function getCigar(query: string): Promise<Either<Error, Cigar[]>> {
	const retrieveCigar = httpCall<Cigar[]>({
		url: "https://api.cigarscanner.com/api/cigars/powersearch",
		method: "POST",
		contentType: "application/json",
		body: JSON.stringify({ Search: query }),
	});

	return retrieveCigar();
}

export function getCigarLine(
	lineID: number
): TaskEither<Error, CigarLine> {
	const retrieveCigarLine = httpCall<CigarLine>({
		url: `https://api.cigarscanner.com/api/cigars/lines/${lineID}`,
		method: "GET",
		contentType: "application/json",
	});

	return retrieveCigarLine;
}

function httpCall<T>(rURLParmas: RequestUrlParam): TaskEither<Error, T> {
	return TE.tryCatch<Error, T>(
		() => requestUrl(rURLParmas).then((r) => r.json as T),
		(reason) => new Error(String(reason))
	);
}

import { CigarLine } from "@models/cigar.line.model";
import { Cigar } from "@models/cigar.model";
import { CigarProduct } from "@models/cigar.product.model";
import { taskEither } from "fp-ts";
import { Either } from "fp-ts/lib/Either";
import { TaskEither } from "fp-ts/lib/TaskEither";
import { RequestUrlParam, requestUrl } from "obsidian";

export interface CigarAPI {
	getCigar(query: string): Promise<Either<Error, Cigar[]>>;
	getCigarLine(lineId: number): Promise<Either<Error, CigarLine>>;
	getCigarProduct(productId: number): Promise<Either<Error, CigarProduct>>;
}

export class CigarAPIImpl implements CigarAPI {
	getCigarProduct(productId: number): Promise<Either<Error, CigarProduct>> {
		const retrieveCigarProduct = this.#httpCall<CigarLine>({
			url: `https://api.cigarscanner.com/api/cigars/products/${productId}`,
			method: "GET",
			contentType: "application/json",
		});

		return retrieveCigarProduct();
	}

	getCigar(query: string): Promise<Either<Error, Cigar[]>> {
		const retrieveCigar = this.#httpCall<Cigar[]>({
			url: "https://api.cigarscanner.com/api/cigars/powersearch",
			method: "POST",
			contentType: "application/json",
			body: JSON.stringify({ Search: query }),
		});

		return retrieveCigar();
	}

	getCigarLine(lineID: number): Promise<Either<Error, CigarLine>> {
		const retrieveCigarLine = this.#httpCall<CigarLine>({
			url: `https://api.cigarscanner.com/api/cigars/lines/${lineID}`,
			method: "GET",
			contentType: "application/json",
		});

		return retrieveCigarLine();
	}

	#httpCall<T>(rURLParmas: RequestUrlParam): TaskEither<Error, T> {
		return taskEither.tryCatch<Error, T>(
			() => requestUrl(rURLParmas).then((r) => r.json as T),
			(reason) => new Error(String(reason))
		);
	}
}

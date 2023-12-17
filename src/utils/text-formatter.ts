import { Shape } from "@models/cigar.line.model";
import { CigarProduct } from "@models/cigar.product.model";
import { taskEither as TE } from "fp-ts";
import { TaskEither } from "fp-ts/lib/TaskEither";

function withShapeAndProduct(shape: Shape, p: CigarProduct): string {
	return `---
name: ${shape.Name}
shape: ${shape.Attributes.Shape}
rating: ${shape.Rating.AverageRating}
strength: ${p.Attributes.Strength}
desc: ${p.Description}
lenght: ${p.Attributes.Length}
ring_gauge: ${p.Attributes.RingGauge}
section: ${p.Attributes.Section}
min_box_qt: ${shape.MinBoxQty}
man_box_qt: ${shape.MaxBoxQty}
date: ${new Date().toLocaleDateString()}
---
# ${shape.Name}
![cover|500](https:${shape.ImageOfSingleUrl})`;
}

export default function shapeAndProductAsText(
	shape: Shape,
	product: CigarProduct
): TaskEither<Error, string> {
	return TE.tryCatch(
		() => Promise.resolve(withShapeAndProduct(shape, product)),
		(reason) => new Error(String(reason))
	);
}

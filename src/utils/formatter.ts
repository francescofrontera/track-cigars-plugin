import { Shape } from "@models/cigar.line.model";
import { CigarProduct } from "@models/cigar.product.model";
import { option, string, task } from "fp-ts";
import { Option } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/function";

function noProduct(shape: Shape): string {
	return `---
name: ${shape.Name}
shape: ${shape.Attributes.Shape}
rating: ${shape.Rating.AverageRating}
min_box_qt: ${shape.MinBoxQty}
man_box_qt: ${shape.MaxBoxQty}
date: ${new Date().toLocaleDateString()}
---
# ${shape.Name}
![cover|500](https:${shape.ImageUrl})`;
}

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

export default function formatCigar(
	shape: Shape,
	product: Option<CigarProduct>
): Promise<string> {
	return task.of(
		pipe(
			product,
			option.fold(
				() => noProduct(shape),
				(p) => withShapeAndProduct(shape, p)
			)
		)
	)();
}

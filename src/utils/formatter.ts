import { Shape } from "@models/cigar.line.model";
import { CigarProduct } from "@models/cigar.product.model";
import { option, task } from "fp-ts";
import { Option } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/function";

export default function formatCigar(
	shape: Shape,
	product: Option<CigarProduct>
): Promise<string> {
	return task.of(
		pipe(
			product,
			option.match(
				() => `# ${shape.Name}`,
				(p) =>
					`---\nname: ${shape.Name}\ndesc: ${
						p.Description
					}\nlenght: ${p.Attributes.Length}\nring_gauge: ${
						p.Attributes.RingGauge
					}\nsection: ${
						p.Attributes.Section
					}\ndate: ${new Date().toLocaleDateString()}\n---\n# ${
						shape.Name
					}`
			)
		)
	)();
}

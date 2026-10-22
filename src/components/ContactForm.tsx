import { ArrowRight } from "lucide-react";
import type { FormEvent } from "react";

const encode = (text: string) => encodeURIComponent(text);

const makeMailto = (email: string, subject: string, body: string) =>
	`mailto:${email}?subject=${encode(subject)}&body=${encode(body)}`;

const field =
	"rounded-lg border border-border bg-background/50 px-4 py-3 transition-colors focus-within:border-accent";
const label = "mb-1 block text-sm text-text-muted";
const control =
	"w-full border-0 bg-transparent p-0 text-base text-text placeholder:text-text-muted/60 focus:outline-none";

export default function ContactForm() {
	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const form = e.currentTarget;
		const email = "joseph.ugalde.murillo@gmail.com";
		const subject = (
			form.elements.namedItem("subject") as HTMLInputElement
		).value;
		const body = (
			form.elements.namedItem("message") as HTMLTextAreaElement
		).value;

		window.location.href = makeMailto(email, subject, body);
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex w-full flex-col gap-6 rounded-2xl border border-border bg-surface p-6 sm:p-8"
		>
			<div className="flex flex-col gap-1.5">
				<h3 className="m-0 text-heading font-semibold text-text">
					Envíame un mensaje
				</h3>

				<p className="m-0 text-base text-text-muted">
					Contame un poco sobre tu idea o proyecto.
				</p>
			</div>

			<div className="flex flex-col gap-4">
				<div className={field}>
					<label htmlFor="subject" className={label}>
						Asunto
					</label>

					<input
						id="subject"
						name="subject"
						type="text"
						placeholder="¿En qué podemos trabajar?"
						required
						className={control}
					/>
				</div>

				<div className={field}>
					<label htmlFor="message" className={label}>
						Mensaje
					</label>

					<textarea
						id="message"
						name="message"
						rows={5}
						placeholder="Contame sobre tu idea, proyecto o necesidad..."
						required
						className={`${control} resize-none`}
					/>
				</div>
			</div>

			<div className="flex justify-end">
				<button
					type="submit"
					className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-accent px-6 py-3 text-base font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
				>
					Enviar
					<ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
				</button>
			</div>
		</form>
	);
}
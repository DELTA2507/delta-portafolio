import { ArrowRight } from "lucide-react";
import type { FormEvent } from "react";

const encode = (text: string) => encodeURIComponent(text);

const makeMailto = (email: string, subject: string, body: string) =>
	`mailto:${email}?subject=${encode(subject)}&body=${encode(body)}`;

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
			className="w-full flex flex-col gap-5 border border-border rounded-xl p-6 md:p-7"
		>
			<div>
				<h3 className="text-lg font-semibold text-text">
					Envíame un mensaje
				</h3>

				<p className="mt-1 text-sm text-text-muted">
					Contame un poco sobre tu idea o proyecto.
				</p>
			</div>

			<div className="flex flex-col gap-3">
				<div className="border border-border/70 rounded-md px-3.5 py-3 focus-within:border-accent transition-colors">
					<label
						htmlFor="subject"
						className="block text-xs text-text-muted mb-1"
					>
						Asunto
					</label>

					<input
						id="subject"
						name="subject"
						type="text"
						placeholder="¿En qué podemos trabajar?"
						required
						className="w-full bg-transparent border-0 p-0 text-sm text-text placeholder:text-text-muted/50 focus:outline-none"
					/>
				</div>

				<div className="border border-border/70 rounded-md px-3.5 py-3 focus-within:border-accent transition-colors">
					<label
						htmlFor="message"
						className="block text-xs text-text-muted mb-1"
					>
						Mensaje
					</label>

					<textarea
						id="message"
						name="message"
						rows={5}
						placeholder="Contame sobre tu idea, proyecto o necesidad..."
						required
						className="w-full bg-transparent border-0 p-0 text-sm text-text placeholder:text-text-muted/50 resize-none focus:outline-none"
					/>
				</div>
			</div>

			<div className="flex justify-end">
				<button
					type="submit"
					className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-md hover:brightness-110 transition cursor-pointer"
				>
					Enviar

					<ArrowRight
						size={16}
						strokeWidth={2}
						aria-hidden="true"
					/>
				</button>
			</div>
		</form>
	);
}
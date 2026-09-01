import type { FormEvent } from "react"

const encode = (text: string) => encodeURIComponent(text)
const makeMailto = (email: string, subject: string, body: string) =>
  `mailto:${email}?subject=${encode(subject)}&body=${encode(body)}`

export default function ContactForm() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const email = 'joseph.ugalde.murillo@gmail.com'
    const subject = (form.elements.namedItem('subject') as HTMLInputElement).value
    const body = (form.elements.namedItem('message') as HTMLTextAreaElement).value
    window.location.href = makeMailto(email, subject, body)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-3 bg-surface border border-border rounded-2xl p-6"
    >
      <h3 className="text-xl font-semibold text-text">Envíame un mensaje</h3>

      <input
        name="subject"
        type="text"
        placeholder="Asunto"
        required
        className="bg-background border border-border p-2.5 rounded-lg text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent transition-shadow"
      />

      <textarea
        name="message"
        rows={5}
        placeholder="Mensaje"
        required
        className="bg-background border border-border p-2.5 rounded-lg text-sm text-text placeholder:text-text-muted resize-none focus:outline-none focus:ring-2 focus:ring-accent transition-shadow"
      />

      <button
        type="submit"
        className="bg-accent hover:brightness-110 transition rounded-lg py-2.5 px-4 text-sm font-semibold text-white cursor-pointer"
      >
        Enviar
      </button>
    </form>
  )
}
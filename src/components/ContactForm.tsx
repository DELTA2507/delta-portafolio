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
      className="w-full flex flex-col gap-2 bg-neutral-800 text-white p-5 rounded-2xl shadow-inner shadow-red-500"
    >
      <h3 className="text-2xl text-center font-semibold">Envíanos un mensaje</h3>
      <input
        name="subject"
        type="text"
        placeholder="Asunto"
        required
        className="bg-neutral-700 p-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
      />
      <textarea
        name="message"
        rows={5}
        placeholder="Mensaje"
        required
        className="bg-neutral-700 p-2 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-secondary"
      />
      <button
        type="submit"
        className="bg-secondary/70 hover:bg-secondary transition rounded-xl py-2 px-4 text-sm font-medium cursor-pointer"
      >
        Enviar
      </button>
    </form>
  )
}
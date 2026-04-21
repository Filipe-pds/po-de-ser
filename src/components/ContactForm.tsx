"use client";

import { useState } from "react";

type ContactFormProps = {
  locale: string;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm({ locale }: ContactFormProps) {
  const isPortuguese = locale === "pt";
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const labels = isPortuguese
    ? {
        name: "Nome",
        email: "Email",
        message: "Mensagem",
        submit: "Enviar",
        sending: "A enviar...",
        success: "Mensagem enviada com sucesso. Obrigado.",
        genericError:
          "Não foi possível enviar a mensagem. Tenta novamente daqui a pouco.",
        missingKey:
          "A chave do formulário ainda não foi configurada neste projeto.",
        namePlaceholder: "O teu nome",
        emailPlaceholder: "o.teu@email.com",
        messagePlaceholder: "Escreve a tua mensagem aqui...",
      }
    : {
        name: "Name",
        email: "Email",
        message: "Message",
        submit: "Send",
        sending: "Sending...",
        success: "Message sent successfully. Thank you.",
        genericError: "The message could not be sent. Please try again shortly.",
        missingKey: "The form key has not been configured in this project yet.",
        namePlaceholder: "Your name",
        emailPlaceholder: "your@email.com",
        messagePlaceholder: "Write your message here...",
      };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!accessKey) {
      setStatus("error");
      setErrorMessage(labels.missingKey);
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries()) as Record<string, string>;

    payload.access_key = accessKey;
    payload.subject = isPortuguese
      ? "Nova mensagem do website Pó de Ser"
      : "New message from the Pó de Ser website";
    payload.from_name = "Pó de Ser Website";
    payload.replyto = payload.email ?? "";

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (response.ok && result.success) {
        setStatus("success");
        form.reset();
        return;
      }

      setStatus("error");
      setErrorMessage(result.message || labels.genericError);
    } catch {
      setStatus("error");
      setErrorMessage(labels.genericError);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-2 block text-sm font-medium text-[var(--ink)]"
          >
            {labels.name}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            placeholder={labels.namePlaceholder}
            className="w-full rounded-[16px] border border-black/12 bg-[var(--cream)]/70 px-4 py-3 text-[var(--ink)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--brand)]"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="mb-2 block text-sm font-medium text-[var(--ink)]"
          >
            {labels.email}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder={labels.emailPlaceholder}
            className="w-full rounded-[16px] border border-black/12 bg-[var(--cream)]/70 px-4 py-3 text-[var(--ink)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--brand)]"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-2 block text-sm font-medium text-[var(--ink)]"
        >
          {labels.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder={labels.messagePlaceholder}
          className="h-52 w-full resize-none rounded-[20px] border border-black/12 bg-[var(--cream)]/70 px-4 py-3 text-[var(--ink)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--brand)]"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-w-[120px] items-center justify-center rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? labels.sending : labels.submit}
        </button>

        <div aria-live="polite" className="text-sm">
          {status === "success" ? (
            <p className="text-[var(--brand)]">{labels.success}</p>
          ) : null}

          {status === "error" ? (
            <p className="text-[#8b3a3a]">{errorMessage}</p>
          ) : null}
        </div>
      </div>
    </form>
  );
}
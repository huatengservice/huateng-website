"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { isValidTaiwanPhone } from "@/lib/validation";
import { site } from "@/lib/content";
import type { Service } from "@/lib/content";

type Errors = Partial<Record<"name" | "phone" | "message", string>>;
type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-ink-soft/60 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30";

export default function ContactForm({ services }: { services: Service[] }) {
  const t = useTranslations("contact.form");
  const [values, setValues] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
    botcheck: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate(): Errors {
    const next: Errors = {};
    if (!values.name.trim()) next.name = t("errorNameRequired");
    if (!values.phone.trim()) {
      next.phone = t("errorPhoneRequired");
    } else if (!isValidTaiwanPhone(values.phone)) {
      next.phone = t("errorPhoneInvalid");
    }
    if (!values.message.trim()) next.message = t("errorMessageRequired");
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    try {
      // Web3Forms' free tier only accepts submissions sent from the
      // visitor's browser, so we post to their API directly (the access
      // key is public by design). Without a key, fall back to the local
      // placeholder endpoint so the flow still works in development.
      const res = site.web3formsAccessKey
        ? await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              access_key: site.web3formsAccessKey,
              subject: `網站聯絡表單：${values.name}`,
              from_name: "華騰工程行網站",
              ...values,
            }),
          })
        : await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
      if (!res.ok) throw new Error("submit_failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function set(field: keyof typeof values) {
    return (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => setValues((v) => ({ ...v, [field]: e.target.value }));
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="border-line rounded-xl border bg-white p-8 text-center"
      >
        <div aria-hidden="true" className="mb-3 text-3xl">
          ✅
        </div>
        <h3 className="mb-2 text-xl font-bold">{t("successTitle")}</h3>
        <p className="text-ink-soft mb-6 text-sm">
          {t("successText", { phone: site.phoneDisplay })}
        </p>
        <button
          type="button"
          onClick={() => {
            setValues({
              name: "",
              phone: "",
              service: "",
              message: "",
              botcheck: "",
            });
            setStatus("idle");
          }}
          className="border-navy-800 text-navy-900 hover:bg-navy-900/5 rounded-md border px-5 py-2.5 text-sm font-bold"
        >
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="cf-name" className="mb-1.5 block text-sm font-bold">
          {t("name")} <span className="text-amber-600">*</span>
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={set("name")}
          placeholder={t("namePlaceholder")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "cf-name-error" : undefined}
          className={inputClass}
        />
        {errors.name && (
          <p id="cf-name-error" className="mt-1 text-xs text-red-700">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="cf-phone" className="mb-1.5 block text-sm font-bold">
          {t("phone")} <span className="text-amber-600">*</span>
        </label>
        <input
          id="cf-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={set("phone")}
          placeholder={t("phonePlaceholder")}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "cf-phone-error" : undefined}
          className={inputClass}
        />
        {errors.phone && (
          <p id="cf-phone-error" className="mt-1 text-xs text-red-700">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="cf-service" className="mb-1.5 block text-sm font-bold">
          {t("service")}
        </label>
        <select
          id="cf-service"
          name="service"
          value={values.service}
          onChange={set("service")}
          className={inputClass}
        >
          <option value="">{t("servicePlaceholder")}</option>
          {services.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
          <option value="other">{t("serviceOther")}</option>
        </select>
      </div>

      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-sm font-bold">
          {t("message")} <span className="text-amber-600">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          value={values.message}
          onChange={set("message")}
          placeholder={t("messagePlaceholder")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "cf-message-error" : undefined}
          className={inputClass}
        />
        {errors.message && (
          <p id="cf-message-error" className="mt-1 text-xs text-red-700">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot field — hidden from real users, catches bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="cf-botcheck">Leave this empty</label>
        <input
          id="cf-botcheck"
          name="botcheck"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.botcheck}
          onChange={set("botcheck")}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-700">
          {t("errorSubmit", { phone: site.phoneDisplay })}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-navy-900 hover:bg-navy-800 w-full rounded-md px-6 py-3.5 text-[0.95rem] font-bold text-white transition-colors disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? t("sending") : t("submit")}
      </button>
    </form>
  );
}

/** Canonical ATS header contact: email · mobile · LinkedIn · GitHub · address */

export const CONTACT_DEFAULTS = {
  email: "princedubey1998@gmail.com",
  phone: "+91 6203720899",
  linkedin: "linkedin.com/in/princedubey1998",
  github: "github.com/princedubey",
  location: "Hyderabad, India",
} as const;

function readKey(header: Element, key: string, fallback: string) {
  const el = header.querySelector(`[data-key="${key}"]`);
  const t = (el?.textContent || "").replace(/\u00a0/g, " ").trim();
  return t || fallback;
}

function stripProtocol(url: string) {
  return url.replace(/^https?:\/\//i, "");
}

/**
 * Collapse header contact into a single line and drop extras
 * (website, partner.microsoft.com, second contact row, Remote suffixes).
 */
export function normalizeContactHeader(scope: HTMLElement) {
  const header = scope.querySelector(".ats-header");
  if (!header) return;

  const email = readKey(header, "email", CONTACT_DEFAULTS.email);
  const phone = readKey(header, "phone", CONTACT_DEFAULTS.phone);
  let linkedin = stripProtocol(readKey(header, "linkedin", CONTACT_DEFAULTS.linkedin));
  let github = stripProtocol(readKey(header, "github", CONTACT_DEFAULTS.github));
  if (!/linkedin\.com/i.test(linkedin)) linkedin = CONTACT_DEFAULTS.linkedin;
  if (!/github\.com/i.test(github)) github = CONTACT_DEFAULTS.github;
  const location = CONTACT_DEFAULTS.location;

  header.querySelectorAll(".contact-line").forEach((n) => n.remove());

  const line = document.createElement("p");
  line.className = "contact-line";

  const sep = () => {
    const s = document.createElement("span");
    s.setAttribute("aria-hidden", "true");
    s.textContent = " · ";
    return s;
  };

  const link = (key: string, href: string, text: string) => {
    const a = document.createElement("a");
    a.className = "contact-link";
    a.href = href;
    a.contentEditable = "true";
    a.dataset.key = key;
    a.textContent = text;
    if (href.startsWith("http")) {
      a.target = "_blank";
      a.rel = "noopener";
    }
    return a;
  };

  const loc = document.createElement("span");
  loc.contentEditable = "true";
  loc.dataset.key = "location";
  loc.textContent = location;

  line.append(
    link("email", `mailto:${email.replace(/^mailto:/i, "")}`, email),
    sep(),
    link("phone", `tel:${phone.replace(/[^\d+]/g, "")}`, phone),
    sep(),
    link("linkedin", `https://${linkedin}`, linkedin),
    sep(),
    link("github", `https://${github}`, github),
    sep(),
    loc
  );

  const role = header.querySelector(".role");
  if (role) role.after(line);
  else header.appendChild(line);
}

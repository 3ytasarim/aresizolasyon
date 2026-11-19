import { z } from "zod";

export const UNITS = ["adet", "m²", "kg", "rulo", "paket", "ton", "m"] as const;
export const PURPOSES = ["new_project", "maintenance", "serial_production", "export_distribution", "other"] as const;

export const FILE_RULES = {
  maxFiles: 3,
  maxBytes: 10 * 1024 * 1024,
  extensions: ["pdf", "dwg", "dxf", "xlsx", "xls", "docx", "doc", "csv", "jpg", "jpeg", "png", "webp", "zip"],
} as const;

const str = (max: number) => z.string().trim().max(max);

export const quoteSchema = z.object({
  site: z.enum(["tr", "en"]),
  items: z
    .array(
      z.object({
        key: str(120),
        name: str(160).min(1),
        category: str(160).optional().default(""),
        quantity: str(40).optional().default(""),
        unit: z.enum(UNITS).default("adet"),
        specs: str(1500).optional().default(""),
      }),
    )
    .max(60),
  otherProducts: str(3000).optional().default(""),
  purpose: z.enum(PURPOSES).optional(),
  deliveryLocation: str(200).min(2),
  deliveryDate: str(60).optional().default(""),
  notes: str(5000).optional().default(""),
  company: str(160).min(2),
  name: str(120).min(2),
  email: z.email().max(200),
  phone: str(40).optional().default(""),
  country: str(80).optional().default(""),
  consent: z.literal(true),
  /** Honeypot — must stay empty */
  website: z.string().max(200).optional().default(""),
  /** Time the form was rendered; submissions faster than 3 s are treated as bots. */
  startedAt: z.number().int(),
}).refine((d) => d.items.length > 0 || d.otherProducts.length > 3, { message: "no_items", path: ["items"] });

export type QuotePayload = z.infer<typeof quoteSchema>;

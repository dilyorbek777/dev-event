import mongoose, { Schema, model, type Model } from "mongoose";

/** Document interface for Event. */
export interface IEvent {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

/** Generates a URL-friendly slug: lowercase, spaces to hyphens, strip invalid chars. */
function slugify(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Normalizes date string to ISO date (YYYY-MM-DD). Invalid dates throw. */
function normalizeDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${dateStr}`);
  }
  return date.toISOString().split("T")[0] as string;
}

/** Normalizes time to 24h HH:mm. Accepts "HH:mm", "HH:mm:ss", or parseable time strings. */
function normalizeTime(timeStr: string): string {
  const trimmed = timeStr.trim();
  const match = trimmed.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?/);
  if (match) {
    const hours = match[1].padStart(2, "0");
    const minutes = match[2];
    return `${hours}:${minutes}`;
  }
  const date = new Date(`1970-01-01T${trimmed}`);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid time: ${timeStr}`);
  }
  return date.toTimeString().slice(0, 5);
}

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    overview: { type: String, required: true },
    image: { type: String, required: true },
    venue: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    mode: { type: String, required: true },
    audience: { type: String, required: true },
    agenda: { type: [String], required: true },
    organizer: { type: String, required: true },
    tags: { type: [String], required: true },
  },
  { timestamps: true },
);

// Unique index on slug (redundant with unique: true but explicit for queries).
eventSchema.index({ slug: 1 }, { unique: true });

type NextFn = (err?: Error) => void;

function getSaveNext(a: unknown, b?: unknown): NextFn {
  return (typeof b === "function" ? b : a) as NextFn;
}

eventSchema.pre("save", function (optionsOrNext: unknown, next?: NextFn) {
  const doc = this;
  const nextFn = getSaveNext(optionsOrNext, next);

  // Require non-empty required strings and arrays.
  const requiredStrings = [
    "title",
    "description",
    "overview",
    "image",
    "venue",
    "location",
    "date",
    "time",
    "mode",
    "audience",
    "organizer",
  ] as const;
  for (const key of requiredStrings) {
    const value = doc[key];
    if (typeof value !== "string" || value.trim() === "") {
      return nextFn(new Error(`Event.${key} is required and must be non-empty`));
    }
  }
  if (!Array.isArray(doc.agenda) || doc.agenda.length === 0) {
    return nextFn(new Error("Event.agenda is required and must be a non-empty array"));
  }
  if (!Array.isArray(doc.tags) || doc.tags.length === 0) {
    return nextFn(new Error("Event.tags is required and must be a non-empty array"));
  }

  // Regenerate slug only when title has changed.
  if (doc.isModified("title")) {
    doc.slug = slugify(doc.title);
  }

  // Normalize date and time to consistent formats.
  try {
    doc.date = normalizeDate(doc.date);
    doc.time = normalizeTime(doc.time);
  } catch (err) {
    return nextFn(err instanceof Error ? err : new Error(String(err)));
  }

  nextFn();
});

const Event: Model<IEvent> =
  (mongoose.models.Event as Model<IEvent>) ?? model<IEvent>("Event", eventSchema);

export { Event };

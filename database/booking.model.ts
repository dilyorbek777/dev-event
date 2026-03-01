import mongoose, { Schema, model, type Model } from "mongoose";
import { Event } from "./event.model";

/** Document interface for Booking. */
export interface IBooking {
  _id: mongoose.Types.ObjectId;
  eventId: mongoose.Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (v: string) => emailRegex.test(v),
        message: (props: { value: string }) => `Invalid email: ${props.value}`,
      },
    },
  },
  { timestamps: true },
);

// Index on eventId for fast lookups (e.g. "bookings for this event").
bookingSchema.index({ eventId: 1 });

type NextFn = (err?: Error) => void;

function getSaveNext(a: unknown, b?: unknown): NextFn {
  return (typeof b === "function" ? b : a) as NextFn;
}

/**
 * Pre-save: ensure the referenced event exists. Prevents orphan bookings and
 * invalid references.
 */
bookingSchema.pre("save", async function (optionsOrNext: unknown, next?: NextFn) {
  const nextFn = getSaveNext(optionsOrNext, next);
  const eventExists = await Event.exists({ _id: this.eventId });
  if (!eventExists) {
    return nextFn(new Error(`Event not found for id: ${this.eventId}`));
  }
  nextFn();
});

const Booking: Model<IBooking> =
  (mongoose.models.Booking as Model<IBooking>) ?? model<IBooking>("Booking", bookingSchema);

export { Booking };

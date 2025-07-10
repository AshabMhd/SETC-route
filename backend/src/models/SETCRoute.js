const mongoose = require("mongoose");

const SETCRouteSchema = new mongoose.Schema(
  {
    depot: {
      type: String,
      required: true,
    },
    route_no: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    route_length: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    no_of_service: {
      type: Number,
      required: true,
    },
    departure_timings: {
      type: String,
      required: true,
    },
    isCustom: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SETCRoute", SETCRouteSchema);

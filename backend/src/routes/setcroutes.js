const express = require("express");
const router = express.Router();
const axios = require("axios");
const SETCRoute = require("../models/SETCRoute");
const { auth } = require("../auth");

// Public route: Fetch routes
router.get("/", async (req, res) => {
  try {
    const { from, to } = req.query;

    const dbQuery = {};
    if (from && typeof from === "string" && from.trim() !== "") {
      dbQuery.from = new RegExp(from.trim(), "i");
    }
    if (to && typeof to === "string" && to.trim() !== "") {
      dbQuery.to = new RegExp(to.trim(), "i");
    }

    const queryToExecute = Object.keys(dbQuery).length > 0 ? dbQuery : {};
    const customRoutes = await SETCRoute.find(queryToExecute);

    return res.json(customRoutes);
  } catch (error) {
    console.error("Error fetching custom routes from DB:", error);
    res
      .status(500)
      .json({ message: "Error fetching custom routes", error: error.message });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const newRoute = new SETCRoute({
      ...req.body,
      isCustom: true,
    });

    const savedRoute = await newRoute.save();
    res.status(201).json(savedRoute);
  } catch (error) {
    console.error("Error adding route:", error);
    res
      .status(500)
      .json({ message: "Error adding route", error: error.message });
  }
});

// Update a custom route
router.put("/:id", auth, async (req, res) => {
  try {
    const updatedRoute = await SETCRoute.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedRoute) {
      return res.status(404).json({ message: "Route not found" });
    }

    res.json(updatedRoute);
  } catch (error) {
    console.error("Error updating route:", error);
    res
      .status(500)
      .json({ message: "Error updating route", error: error.message });
  }
});

// Delete a custom route
router.delete("/:id", auth, async (req, res) => {
  try {
    const deletedRoute = await SETCRoute.findByIdAndDelete(req.params.id);

    if (!deletedRoute) {
      return res.status(404).json({ message: "Route not found" });
    }

    res.json({ message: "Route deleted successfully" });
  } catch (error) {
    console.error("Error deleting route:", error);
    res
      .status(500)
      .json({ message: "Error deleting route", error: error.message });
  }
});

module.exports = router;

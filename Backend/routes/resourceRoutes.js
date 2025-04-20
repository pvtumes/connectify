const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resourceController");
const authMiddleware = require("../middleware/authMiddleware");
const uploadMiddleware = require("../middleware/uploadMiddleware");

// Upload resource
router.post(
  "/",
  authMiddleware,
  uploadMiddleware.single("file"),
  resourceController.uploadResource
);

// Get all resources (with filtering)
router.get("/", authMiddleware, resourceController.getAllResources);

// Get a single resource
router.get("/:id", authMiddleware, resourceController.getResource);

// Update resource
router.put("/:id", authMiddleware, resourceController.updateResource);

// Delete resource
router.delete("/:id", authMiddleware, resourceController.deleteResource);

// Toggle bookmark
router.patch(
  "/:id/bookmark",
  authMiddleware,
  resourceController.toggleBookmark
);

// Toggle reviewed status
router.patch(
  "/:id/reviewed",
  authMiddleware,
  resourceController.toggleReviewed
);

// Increment view count
router.patch(
  "/:id/view",
  authMiddleware,
  resourceController.incrementViewCount
);

module.exports = router;

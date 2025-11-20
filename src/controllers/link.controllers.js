import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { Link } from "../models/link.model.js";
import { isValidUrl, generateShortCode } from "../utils/validators.js";

const createLink = asyncHandler(async (req, res) => {
  const { targetUrl, shortCode } = req.body;

  if (!targetUrl) {
    throw new ApiError(400, "URL is Required");
  }

  if (!isValidUrl(targetUrl)) {
    throw new ApiError(400, "Invalid URL format");
  }

  let code = shortCode || generateShortCode();
  
  const existingLink = await Link.findOne({ shortCode: code });
  if (existingLink) {
    throw new ApiError(409, "Short code already exists");
  }

  const link = await Link.create({
    shortCode: code,
    targetUrl,
  });

  res.status(201).json(new ApiResponse(201, link, "Link created successfully"));
});

const getAllLinks = asyncHandler(async (req, res) => {
  const { search } = req.query;
  let query = {};

  if (search) {
    query = {
      $or: [
        { shortCode: { $regex: search, $options: "i" } },
        { targetUrl: { $regex: search, $options: "i" } },
      ],
    };
  }

  const links = await Link.find(query).sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, links, "Links retrieved successfully"));
});

const getLinkByCode = asyncHandler(async (req, res) => {
  const { code } = req.params;

  const link = await Link.findOne({ shortCode: code });

  if (!link) {
    throw new ApiError(404, "Link not found");
  }

  res.status(200).json(new ApiResponse(200, link, "Link retrieved successfully"));
});

const deleteLink = asyncHandler(async (req, res) => {
  const { code } = req.params;

  const link = await Link.findOneAndDelete({ shortCode: code });

  if (!link) {
    throw new ApiError(404, "Link not found");
  }

  res.status(200).json(new ApiResponse(200, null, "Link deleted successfully"));
});

const redirectLink = asyncHandler(async (req, res) => {
  const { code } = req.params;

  const link = await Link.findOne({ shortCode: code });

  if (!link) {
    throw new ApiError(404, "Link not found");
  }

  link.clicks += 1;
  link.lastClicked = new Date();
  await link.save();
  
  res.redirect(302, link.targetUrl);
});

export { createLink, getAllLinks, getLinkByCode, deleteLink, redirectLink };


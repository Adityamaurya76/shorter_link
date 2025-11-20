import { asyncHandler } from "../utils/async-handler.js";
import os from "os";

const healthCheck = asyncHandler(async (req, res) => {
    const uptime = process.uptime();
    const healthData = {
        ok: true,
        version: "1.0",
        uptime: Math.floor(uptime),
        timestamp: new Date().toISOString(),
    };
    res.status(200).json(healthData);
});

export { healthCheck };
import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1,
    });

    console.log(decision);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          message: "Rate limit exceeded. Try again later.",
        });
      } 

      if (decision.reason.isBot()) {
        return res.status(403).json({
          message: "Bot access denied",
        });
      }

      return res.status(403).json({
        message: "Access denied by security policy",
      });
    }

    // spoofed bot check
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        message: "Malicious bot activity detected",
        error: "Spoofed bot detected",
      });
    }

    next();
  } catch (err) {
    console.log("Arcjet Protection Error", err);

    next();
  }
};

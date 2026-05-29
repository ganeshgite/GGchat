import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { isSpoofedBot } from "@arcjet/inspect";
import express from "express";

const app = express();
const port = 3000;

const aj = arcjet({
   
  key: process.env.ARCJET_KEY,
  rules: [
     shield({ mode: "LIVE" }),
     detectBot({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
       allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
         "POSTMAN"
      ],
    }),
    // Create a token bucket rate limit. Other algorithms are supported.
    tokenBucket({
      mode: "LIVE",
      
      refillRate: 15, // Refill 5 tokens per interval
      interval: 60, // Refill every 10 seconds
      capacity: 15, // Bucket capacity of 10 tokens
       
       
    }),
  ],
});
 

export default aj
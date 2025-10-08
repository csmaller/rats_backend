"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/netlify/functions/_prisma.ts
var prisma_exports = {};
__export(prisma_exports, {
  default: () => prisma_default
});
module.exports = __toCommonJS(prisma_exports);
var import_client = require("@prisma/client");
var import_extension_optimize = require("@prisma/extension-optimize");
var globalAny = globalThis;
var extendedPrisma = new import_client.PrismaClient().$extends(
  (0, import_extension_optimize.withOptimize)({ apiKey: process.env.OPTIMIZE_API_KEY })
);
var prisma = globalAny.__prisma ?? extendedPrisma;
if (process.env.NODE_ENV !== "production")
  globalAny.__prisma = prisma;
var prisma_default = prisma;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL25ldGxpZnkvZnVuY3Rpb25zL19wcmlzbWEudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gJ0BwcmlzbWEvY2xpZW50JztcbmltcG9ydCB7IHdpdGhPcHRpbWl6ZSB9IGZyb20gJ0BwcmlzbWEvZXh0ZW5zaW9uLW9wdGltaXplJztcblxuY29uc3QgZ2xvYmFsQW55OiBhbnkgPSBnbG9iYWxUaGlzIGFzIGFueTtcblxuLy8gQ3JlYXRlIGEgUHJpc21hIGNsaWVudCBleHRlbmRlZCB3aXRoIHRoZSBPcHRpbWl6ZSBleHRlbnNpb24uIFRoZSBBUEkga2V5XG4vLyBpcyBwcm92aWRlZCB2aWEgdGhlIE9QVElNSVpFX0FQSV9LRVkgZW52aXJvbm1lbnQgdmFyaWFibGUuXG5jb25zdCBleHRlbmRlZFByaXNtYSA9IG5ldyBQcmlzbWFDbGllbnQoKS4kZXh0ZW5kcyhcblx0d2l0aE9wdGltaXplKHsgYXBpS2V5OiBwcm9jZXNzLmVudi5PUFRJTUlaRV9BUElfS0VZIH0pXG4pO1xuXG4vLyBQcmVzZXJ2ZSB0aGUgZ2xvYmFsIHNpbmdsZXRvbiBzbyBOZXRsaWZ5IGZ1bmN0aW9uIGludm9jYXRpb25zIHJldXNlIHRoZVxuLy8gc2FtZSBQcmlzbWEgY2xpZW50IGluIGRldmVsb3BtZW50IChhbmQgZG9uJ3QgY3JlYXRlIG1hbnkgY29ubmVjdGlvbnMpLlxuY29uc3QgcHJpc21hID0gZ2xvYmFsQW55Ll9fcHJpc21hID8/IGV4dGVuZGVkUHJpc21hO1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIGdsb2JhbEFueS5fX3ByaXNtYSA9IHByaXNtYTtcblxuZXhwb3J0IGRlZmF1bHQgcHJpc21hO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsb0JBQTZCO0FBQzdCLGdDQUE2QjtBQUU3QixJQUFNLFlBQWlCO0FBSXZCLElBQU0saUJBQWlCLElBQUksMkJBQWEsRUFBRTtBQUFBLE1BQ3pDLHdDQUFhLEVBQUUsUUFBUSxRQUFRLElBQUksaUJBQWlCLENBQUM7QUFDdEQ7QUFJQSxJQUFNLFNBQVMsVUFBVSxZQUFZO0FBQ3JDLElBQUksUUFBUSxJQUFJLGFBQWE7QUFBYyxZQUFVLFdBQVc7QUFFaEUsSUFBTyxpQkFBUTsiLAogICJuYW1lcyI6IFtdCn0K

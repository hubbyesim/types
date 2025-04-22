"use strict";
/**
 * Utils barrel file
 * Exports all utility functions from a single point for easier imports
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericFromFirestore = exports.genericToFirestore = exports.isDate = exports.convertToDate = void 0;
// Export collections
__exportStar(require("./collections"), exports);
// Export the documentation helpers
__exportStar(require("./documentation"), exports);
// Export the validation helpers
__exportStar(require("./validator"), exports);
// Export the version compatibility helpers
__exportStar(require("./version"), exports);
// Export schema utilities
__exportStar(require("./schemas"), exports);
// Export conversion utilities
var utils_1 = require("../utils");
Object.defineProperty(exports, "convertToDate", { enumerable: true, get: function () { return utils_1.convertToDate; } });
Object.defineProperty(exports, "isDate", { enumerable: true, get: function () { return utils_1.isDate; } });
Object.defineProperty(exports, "genericToFirestore", { enumerable: true, get: function () { return utils_1.genericToFirestore; } });
Object.defineProperty(exports, "genericFromFirestore", { enumerable: true, get: function () { return utils_1.genericFromFirestore; } });

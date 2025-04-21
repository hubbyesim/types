"use strict";
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
exports.priceListFromFirestore = exports.priceListToFirestore = exports.priceListAppSchema = exports.priceListFirestoreSchema = void 0;
// Re-export all type definitions
__exportStar(require("./package"), exports);
__exportStar(require("./partner"), exports);
__exportStar(require("./user"), exports);
__exportStar(require("./country"), exports);
__exportStar(require("./booking"), exports);
__exportStar(require("./promoCode"), exports);
__exportStar(require("./hubby"), exports);
__exportStar(require("./esim"), exports);
__exportStar(require("./api"), exports);
__exportStar(require("./payment"), exports);
__exportStar(require("./apiLogs"), exports);
__exportStar(require("./constants"), exports);
// Export schema types and conversion functions
var partner_1 = require("./schemas/partner");
Object.defineProperty(exports, "priceListFirestoreSchema", { enumerable: true, get: function () { return partner_1.priceListFirestoreSchema; } });
Object.defineProperty(exports, "priceListAppSchema", { enumerable: true, get: function () { return partner_1.priceListAppSchema; } });
Object.defineProperty(exports, "priceListToFirestore", { enumerable: true, get: function () { return partner_1.priceListToFirestore; } });
Object.defineProperty(exports, "priceListFromFirestore", { enumerable: true, get: function () { return partner_1.priceListFromFirestore; } });

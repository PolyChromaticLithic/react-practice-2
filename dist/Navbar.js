"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
function Navbar() {
    return (react_1.default.createElement("nav", null,
        react_1.default.createElement(react_router_dom_1.Link, { to: "/" }, "Home"),
        " | ",
        react_1.default.createElement(react_router_dom_1.Link, { to: "/about" }, "About")));
}
exports.default = Navbar;

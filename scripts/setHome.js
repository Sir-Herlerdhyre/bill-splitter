const fs = require("fs");
const path = require("path");
const packagePath = path.join(__dirname, "..", "package.json");

const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));
pkg.homepage = "https://sir-herlerdhyre.github.io/bill-splitter/";
fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));
console.log("Homepage set for GitHub Pages");

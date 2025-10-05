const fs = require("fs");
const path = require("path");
const packagePath = path.join(__dirname, "..", "package.json");

const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));
delete pkg.homepage;
fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));
console.log(" Homepage removed for Vercel");

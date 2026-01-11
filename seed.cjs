const Database = require("better-sqlite3");

const db = new Database("local.db");

// Insert extensions
const insertExtension = db.prepare(`
  INSERT OR REPLACE INTO extensions (slug, name, description, version, price, trialDays, features)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

insertExtension.run(
  "parametrix",
  "PARAMETRIX",
  "Professional Parametric Cladding Layout Generator",
  "1.0.0",
  4900, // $49.00 in cents
  7,
  JSON.stringify([
    "Parametric cladding layouts",
    "Advanced geometry tools",
    "Material optimization",
    "Export to CAD formats",
  ])
);

insertExtension.run(
  "autonestcut",
  "AutoNestCut",
  "Intelligent Cut List and Nesting Optimization",
  "1.0.0",
  4900, // $49.00 in cents
  7,
  JSON.stringify([
    "Automatic cut list generation",
    "Material nesting optimization",
    "Cost calculation",
    "Export to manufacturing",
  ])
);

console.log("Database seeded successfully!");
db.close();

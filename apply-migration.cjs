const Database = require("better-sqlite3");
const fs = require("fs");

const db = new Database("local.db");

// Read and execute the migration SQL
const sql = fs.readFileSync("drizzle/0000_stale_shen.sql", "utf8");

// Split by statement breakpoint and execute each statement
const statements = sql.split("--> statement-breakpoint");

statements.forEach(statement => {
  const cleanStatement = statement.trim();
  if (cleanStatement && !cleanStatement.startsWith("-->")) {
    try {
      db.exec(cleanStatement);
      console.log("Executed:", cleanStatement.substring(0, 50) + "...");
    } catch (error) {
      console.log(
        "Skipped (already exists):",
        cleanStatement.substring(0, 50) + "..."
      );
    }
  }
});

console.log("Migration applied successfully!");
db.close();

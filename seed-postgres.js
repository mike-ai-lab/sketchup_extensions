import postgres from 'postgres';
import 'dotenv/config';

const sql = postgres(process.env.DATABASE_URL);

async function seed() {
  try {
    console.log('Seeding Supabase database...');
    
    // Insert extensions
    await sql`
      INSERT INTO extensions (slug, name, description, version, price, "trialDays", features)
      VALUES 
        ('parametrix', 'PARAMETRIX', 'Professional Parametric Cladding Layout Generator', '1.0.0', 4900, 7, '["Parametric cladding layouts","Advanced geometry tools","Material optimization","Export to CAD formats"]'),
        ('autonestcut', 'AutoNestCut', 'Intelligent Cut List and Nesting Optimization', '1.0.0', 4900, 7, '["Automatic cut list generation","Material nesting optimization","Cost calculation","Export to manufacturing"]')
      ON CONFLICT (slug) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        version = EXCLUDED.version,
        price = EXCLUDED.price,
        "trialDays" = EXCLUDED."trialDays",
        features = EXCLUDED.features
    `;
    
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await sql.end();
  }
}

seed();
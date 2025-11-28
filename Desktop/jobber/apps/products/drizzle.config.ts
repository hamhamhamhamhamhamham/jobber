import {defineConfig} from  'drizzle-kit' 


//DRIZZLE CLI conf
// drizzle generate -> generate migrations
//drizzle migrate -> apply  migration
export default defineConfig({
    schema:"./src/**/schema.ts",
    out:"./drizzle",
    dialect:"postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
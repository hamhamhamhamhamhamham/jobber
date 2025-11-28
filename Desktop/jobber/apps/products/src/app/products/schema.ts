
import { serial,real,
integer,
text,
pgTable } from "drizzle-orm/pg-core"
//no excessive  command to generate DRIZZLE TYPES(DRIZZLE CODES) in reverse to PRISMA!


export const products = pgTable("products",{   // TABLE & COLS 
    id : serial("id").primaryKey(),
    name: text('name'),
    category: text("category"),
    price:real("price"),
    stock:integer('stock'),
    rating:real('rating'),
    description:text('description')
})
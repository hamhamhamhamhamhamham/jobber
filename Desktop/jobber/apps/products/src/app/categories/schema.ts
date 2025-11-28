

import { serial,
text,
integer,
pgTable } from "drizzle-orm/pg-core"


// without using 1-1 relation products-category!!
export const categories = pgTable("categories",{   
    id : serial("id").primaryKey(),
    name: text('name').unique(),
    charge: integer("charge"),
    
})
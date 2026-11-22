import { createAuth } from "@Data-Visualization-Course-For-Product-Designers/auth";
import { createDb } from "@Data-Visualization-Course-For-Product-Designers/db";

import { ENV } from "./env.server";

export const db = createDb(ENV);
export const auth = createAuth(ENV, db);

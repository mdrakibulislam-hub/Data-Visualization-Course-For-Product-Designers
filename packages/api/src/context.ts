import type { Session } from "@Data-Visualization-Course-For-Product-Designers/auth";
import type { Database } from "@Data-Visualization-Course-For-Product-Designers/db";

export type Context = {
  session: Session | null;
  db: Database;
};

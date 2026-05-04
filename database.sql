SELECT
    pg_catalog.set_config('search_path', '', false);

CREATE SCHEMA IF NOT EXISTS "public";

CREATE TABLE IF NOT EXISTS "public"."user_profiles" (
    "id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text",
    "account_type" text DEFAULT 'rep',
    "points" numeric DEFAULT '0' NOT NULL
);

ALTER TABLE
    ONLY "public"."user_profiles"
ADD
    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id");

ALTER TABLE
    ONLY "public"."user_profiles"
ADD
    CONSTRAINT "user_profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id");

CREATE POLICY "Anyone can view profiles" ON "public"."user_profiles" FOR
SELECT
    USING (true);

CREATE POLICY "User can insert their own profile" ON "public"."user_profiles" FOR
INSERT
    TO "authenticated" WITH CHECK (("auth"."uid"() = "id"));

CREATE POLICY "User can update their own points" ON "public"."user_profiles" FOR
UPDATE
    TO "authenticated" USING (("auth"."uid"() = "id")) WITH CHECK (("auth"."uid"() = "id"));

ALTER TABLE
    "public"."user_profiles" ENABLE ROW LEVEL SECURITY;

CREATE
OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger" LANGUAGE "plpgsql" SECURITY DEFINER
SET
    "search_path" TO '' AS $$ 
begin
insert into
    public.user_profiles (id, name, account_type)
values
    (
        new.id,
        new.raw_user_meta_data ->> 'name',
        new.raw_user_meta_data ->> 'account_type'
    );

return new;

end;

$$;

CREATE TRIGGER on_auth_user_created
after
insert
    on auth.users for each row execute procedure public.handle_new_user();

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "anon";

GRANT USAGE ON SCHEMA "public" TO "authenticated";

GRANT USAGE ON SCHEMA "public" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";
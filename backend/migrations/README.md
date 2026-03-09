# 📚 Database Migrations

This folder contains SQL migration scripts for setting up the Mental Health Companion database in Supabase.

## Files

### `001_initial_schema.sql`

Creates the initial database schema with three main tables:

- **users** - Stores user account information
  - id, username, email, password, full_name, avatar
  - region, language, is_active
  - created_at, last_login, updated_at

- **conversations** - Stores chat session history
  - id, user_id, messages (JSONB)
  - is_crisis_session, crisis_alert
  - suggested_strategies, session_summary
  - started_at, ended_at

- **mood_entries** - Stores daily mood tracking data
  - id, user_id, mood_score (1-5)
  - emotion, activities, notes, triggers
  - coping_strategies_used, sleep_quality
  - physical_activity, meal_times, date

## How to Run

### Method 1: Supabase Dashboard (Recommended)

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **SQL Editor** (left sidebar)
4. Click **"New Query"**
5. Copy & paste contents of `001_initial_schema.sql`
6. Click **"Run"** or press `Cmd+Enter`
7. Verify tables appear in **Table Editor**

### Method 2: Using Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project (follow prompts)
supabase link

# Run migration
supabase migration up --file-path ./migrations/001_initial_schema.sql
```

## Migration Features

✅ **Automatic Timestamps** - `created_at`, `updated_at` auto-populated
✅ **Indexes** - Fast queries on user_id, email, date fields
✅ **Row-Level Security** - RLS policies included
✅ **Triggers** - Auto-update timestamps on data changes
✅ **Foreign Keys** - Referential integrity with ON DELETE CASCADE

## Reverting Migrations

To revert (delete all tables):

```sql
DROP TABLE IF EXISTS mood_entries CASCADE;
DROP TABLE IF EXISTS conversations CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
```

**WARNING: This will delete all data!**

## Adding New Migrations

When adding features, create a new file:

```
002_feature_name.sql
003_another_feature.sql
...
```

Then run them through the Supabase Dashboard or CLI.

## Checking Migration Status

In Supabase Dashboard:
1. Go to **Table Editor**
2. All three tables should be visible
3. Click on each to verify structure

## Backup & Restore

### Backup
```bash
# Export data
pg_dump -h your-project.supabase.co -U postgres -d postgres > backup.sql
```

### Restore
```bash
# Import data
psql -h your-project.supabase.co -U postgres -d postgres < backup.sql
```

## Support

- [Supabase DB Docs](https://supabase.com/docs/guides/database)
- [SQL Reference](https://supabase.com/docs/reference/sql)
- [Migrations Guide](https://supabase.com/docs/guides/migrations)

---

*Last updated: March 9, 2026*

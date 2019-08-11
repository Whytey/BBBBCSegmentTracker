#!/usr/bin/env python

# Non-interactive script, used to bootstrap our db.  Effectively creates the tables
# for the DB

import argparse

from db import database, Member, Segment, Attempt, Misc

parser = argparse.ArgumentParser(description='Create DB')
parser.add_argument('--force', '-f', action='store_true',
                    help='drops existing table data, recreates the schema and re-populates with Club members.  If not specified and the tables already exist, this script would error')

args = parser.parse_args()

# Drop existing tables, recreate the schema
database.connect()
for table in [Member, Segment, Attempt, Misc]:
    if table.table_exists():
        if args.force:
            table.drop_table()
        else:
            print("should error; {t} exists but we're not forcing".format(t=table))
    table.create_table()

database.close()

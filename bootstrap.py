#!/usr/bin/env python

# Non-interactive script, used to bootstrap our db.  Effectively creates the tables
# for the DB

import argparse
import peeweedbevolve
from db import db, Member, Segment, Attempt, Misc

parser = argparse.ArgumentParser(description='Create DB')
parser.add_argument('--drop', '-d', action='store_true',
                    help='drops existing table data and recreates the schema.  If not specified and the tables already exist any migrations required would be performed.')

args = parser.parse_args()

# Drop existing tables, recreate the schema
db.connect()
tables = [Member, Segment, Attempt, Misc]
if args.drop:
    print ("Dropping Tables")
    db.drop_tables(tables)
print ("Creating Tables")
db.create_tables(tables)
db.close()

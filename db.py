import os

from peewee import *

import config

database = SqliteDatabase(
    os.path.join(
        os.path.dirname(os.path.realpath(__file__)),
        config.db_file
    )
)


# db = SqliteDatabase('~/PycharmProjects/BBBBCSegmentTracker/bbbbc_segments.db')


class BaseModel(Model):
    class Meta:
        database = database


class Member(BaseModel):
    athlete_id = IntegerField(primary_key=True)
    last_name = CharField()
    first_name = CharField()
    handicap = FloatField(default=1)
    refresh_token = CharField(null=True)
    access_token = CharField(null=True)
    access_token_expiry = DateTimeField(null=True)
    audit_inserted = DateTimeField(constraints=[SQL('DEFAULT CURRENT_TIMESTAMP')])


class Segment(BaseModel):
    id = IntegerField(primary_key=True)
    date_from = DateField()
    date_to = DateField()
    segment_id = IntegerField()
    audit_inserted = DateTimeField(constraints=[SQL('DEFAULT CURRENT_TIMESTAMP')])


class Attempt(BaseModel):
    effort_id = IntegerField(primary_key=True)
    member_id = ForeignKeyField(Member)
    segment_id = ForeignKeyField(Segment)
    recorded_time_secs = IntegerField()
    handicap_for_attempt = FloatField()
    activity_timestamp = DateTimeField()
    activity_id = IntegerField(null=True)
    audit_inserted = DateTimeField(constraints=[SQL('DEFAULT CURRENT_TIMESTAMP')])


class Misc(BaseModel):
    schema_version = CharField()
    club_id = IntegerField()

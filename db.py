import peewee as pw
from playhouse.db_url import connect

import config

db = connect(config.db_url)


class BaseModel(pw.Model):
    class Meta:
        database = db


class Member(BaseModel):
    athlete_id = pw.IntegerField(primary_key=True)
    last_name = pw.CharField()
    first_name = pw.CharField()
    handicap = pw.FloatField(default=1)
    refresh_token = pw.CharField(null=True)
    access_token = pw.CharField(null=True)
    access_token_expiry = pw.BigIntegerField(null=True)
    audit_inserted = pw.DateTimeField(constraints=[pw.SQL('DEFAULT CURRENT_TIMESTAMP')])


class Segment(BaseModel):
    id = pw.AutoField(primary_key=True)
    date_from = pw.DateField()
    date_to = pw.DateField()
    segment_id = pw.BigIntegerField()
    audit_inserted = pw.DateTimeField(constraints=[pw.SQL('DEFAULT CURRENT_TIMESTAMP')])


class Attempt(BaseModel):
    effort_id = pw.BigIntegerField(primary_key=True)
    member_id = pw.ForeignKeyField(Member, backref='attempts')
    segment_id = pw.ForeignKeyField(Segment, backref='attempts')
    recorded_time_secs = pw.IntegerField()
    handicap_for_attempt = pw.FloatField()
    activity_timestamp = pw.DateTimeField()
    activity_id = pw.BigIntegerField(null=True)
    audit_inserted = pw.DateTimeField(constraints=[pw.SQL('DEFAULT CURRENT_TIMESTAMP')])


class Misc(BaseModel):
    schema_version = pw.CharField()
    club_id = pw.IntegerField()

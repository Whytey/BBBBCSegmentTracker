import calendar
from abc import abstractmethod
from datetime import date, datetime

from matchbox import database, models

import tracker.config as config

database.db_initialization(config.firestore_service_account)


class BaseModel(models.Model):
    audit_inserted = models.TimeStampField()

    class Meta:
        abstract = True

    def __unicode__(self):
        return self.id

    @abstractmethod
    def add(self):
        pass

    @abstractmethod
    def jsonify(self):
        pass


class Member(BaseModel):
    last_name = models.TextField()
    first_name = models.TextField()
    refresh_token = models.TextField(blank=True)
    access_token = models.TextField(blank=True)
    access_token_expiry = models.IntegerField(blank=True)

    @staticmethod
    def add(athlete, refresh_token=None, access_token=None, access_token_expiry=None):
        """Takes a stravalib.model.Athlete object and adds it """
        m = Member.objects.create(id=athlete.id, last_name=athlete.lastname, first_name=athlete.firstname,
                                  refresh_token=refresh_token, access_token=access_token,
                                  access_token_expiry=access_token_expiry, audit_inserted=datetime.utcnow())
        m.save()
        Handicap.add(m)
        Activity.add(Activity.MEMBER_CONNECTED, member_id=m.id)

        return m

    def update_handicap(self, new_handicap):
        Handicap.add(self, new_handicap)

    def jsonify(self):
        return {"id": self.id, "first_name": self.first_name, "last_name": self.last_name}


class Handicap(BaseModel):
    member = models.ReferenceField(Member)
    handicap = models.IntegerField(default=1)

    @staticmethod
    def add(member, handicap=1):
        h = Handicap.objects.create(member=member, handicap=handicap, audit_inserted=datetime.utcnow())
        h.save()

        return h


class Challenge(BaseModel):
    date_from = models.TimeStampField()
    date_to = models.TimeStampField()
    segment_id = models.IntegerField()
    segment_name = models.TextField()
    audit_inserted = models.TimeStampField(datetime.now())

    @staticmethod
    def add(segment, year, month):
        """Takes a stravalib.model.Segment object and adds it as the target challenege to cover the given month of the given year"""
        _, end_day = calendar.monthrange(year, month)

        date_from = datetime.combine(date(year, month, 1), datetime.min.time())
        date_to = datetime.combine(date(year, month, end_day), datetime.min.time())

        c = Challenge.objects.create(segment_id=segment.id, segment_name=segment.name, date_from=date_from,
                                     date_to=date_to, audit_inserted=datetime.utcnow())
        c.save()
        Activity.add(Activity.CHALLENGE_ADDED, challenge_id=c.id)

        return c

    def jsonify(self):
        return {"id": self.id, "date_from": self.date_from, "date_to": self.date_to, "segment_id": self.segment_id,
                "segment_name": self.segment_name}


class Attempt(BaseModel):
    member = models.ReferenceField(Member)
    challenge = models.ReferenceField(Challenge)
    recorded_time_secs = models.IntegerField()
    activity_timestamp = models.TimeStampField()
    activity_id = models.IntegerField(blank=True)

    @staticmethod
    def add(effort, member, challenge):
        a = Attempt.objects.create(id=effort.id, member=member, challenge=challenge,
                                   recorded_time_secs=effort.elapsed_time.total_seconds(),
                                   activity_timestamp=effort.start_date_local, activity_id=effort.activity.id,
                                   audit_inserted=datetime.utcnow())
        a.save
        Activity.add(Activity.CHALLENGE_ATTEMPTED,
                     member_id=member.id, challenge_id=challenge.id, attempt_id=a.id)

        return a

    def jsonify(self):
        return {"id": self.id, "member_id": self.member.id, "challenge_id": self.challenge.id,
                "recorded_time_secs": self.recorded_time_secs, "activity_timestamp": self.activity_timestamp,
                "activity_id": self.activity_id}


class Activity(BaseModel):
    message = models.TextField(blank=True)
    member_id = models.TextField(blank=True)
    challenge_id = models.TextField(blank=True)
    attempt_id = models.TextField(blank=True)

    MEMBER_CONNECTED = "MEMBER_CONNECTED"
    CHALLENGE_ADDED = "CHALLENGE_ADDED"
    CHALLENGE_ATTEMPTED = "CHALLENGE_ATTEMPTED"

    @staticmethod
    def add(message, member_id=None, challenge_id=None, attempt_id=None):
        a = Activity.objects.create(message=message, member_id=member_id, challenge_id=challenge_id,
                                    attempt_id=attempt_id, audit_inserted=datetime.utcnow())
        a.save()

        return a

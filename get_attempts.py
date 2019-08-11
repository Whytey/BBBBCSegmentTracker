import datetime
import time

from stravalib import Client

import config
from db import Member, Segment, Attempt


class StravaPoller():
    def __init__(self):
        pass

    def pull_data(self):
        client = Client()

        segment = (Segment.select().where(Segment.date_from <= datetime.datetime.now())).get()

        members = Member.select()
        for member in members:
            print("Member: {}".format(member.athlete_id))
            client.access_token = member.access_token
            if time.time() > member.access_token_expiry:
                print("Renewing token")
                refresh_response = client.refresh_access_token(client_id=config.strava_client_id,
                                                               client_secret=config.strava_client_secret,
                                                               refresh_token=member.refresh_token)
                member.access_token = refresh_response['access_token']
                member.refresh_token = refresh_response['refresh_token']
                member.access_token_expiry = refresh_response['expires_at']
                member.save()
            efforts = client.get_segment_efforts(segment.segment_id, start_date_local=segment.date_from,
                                                 end_date_local=segment.date_to)
            for effort in efforts:
                print("{} vs {}".format(effort.elapsed_time, effort.moving_time))
                rowid = Attempt.insert(effort_id=effort.id,
                                       member_id=effort.athlete.id,
                                       segment_id=effort.segment.id,
                                       recorded_time_secs=effort.elapsed_time.total_seconds(),
                                       handicap_for_attempt=member.handicap,
                                       activity_timestamp=effort.start_date_local,
                                       activity_id=effort.activity.id).on_conflict_ignore().execute()

                print(rowid)


if __name__ == '__main__':
    poller = StravaPoller()
    poller.pull_data()

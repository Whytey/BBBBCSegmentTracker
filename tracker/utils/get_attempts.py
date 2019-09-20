import logging
import sys
import time

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)
logger = logging.getLogger(__name__)

from stravalib import Client

import config
from model import Member, Challenge, Attempt


class StravaPoller():
    def __init__(self):
        pass

    def pull_data(self, members, challenges):
        client = Client()

        for m in members:
            logger.debug("processing member: {}".format(m))

            # Check if the access token needs renewing.  Should last 6hrs, so only needs doing once regardless of how many calls we make.
            if time.time() > m.access_token_expiry:
                logger.info("Renewing token")
                refresh_response = client.refresh_access_token(client_id=config.strava_client_id,
                                                               client_secret=config.strava_client_secret,
                                                               refresh_token=m.refresh_token)
                m.access_token = refresh_response['access_token']
                m.refresh_token = refresh_response['refresh_token']
                m.access_token_expiry = refresh_response['expires_at']
                m.save()

            client.access_token = m.access_token
            client.refresh_token = m.refresh_token
            client.token_expires_at = m.access_token_expiry

            for c in challenges:
                logger.debug("Processing challenge: {}".format(c))

                efforts = client.get_segment_efforts(c.segment_id, start_date_local=c.date_from,
                                                     end_date_local=c.date_to)
                for e in efforts:
                    logger.debug("Processing effort: {}".format(e))
                    Attempt.add(e, m, c)


if __name__ == '__main__':
    challenges = Challenge.objects.all()
    members = Member.objects.all()
    poller = StravaPoller()
    poller.pull_data(members, challenges)

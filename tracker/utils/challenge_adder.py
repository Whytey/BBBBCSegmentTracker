import logging
import sys
import time

from stravalib import Client

import config
from model import Member, Challenge

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)
logger = logging.getLogger(__name__)

client = Client()


def add_challenge(segment_id, year, month):
    segment = client.get_segment(segment_id)

    print(segment)

    Challenge.add(segment, year, month)


if __name__ == '__main__':
    m = Member.objects.filter(refresh_token__gte="").limit(1)

    print (list(m))
    m = list(m)[0]

    client.access_token = m.access_token
    client.refresh_token = m.refresh_token
    client.token_expires_at = m.access_token_expiry

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

    add_challenge(4896037, 2019, 2)
    add_challenge(13028666, 2019, 3)
    add_challenge(5993929, 2019, 4)
    add_challenge(4837370, 2019, 8)

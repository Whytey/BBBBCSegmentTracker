import logging
import time

from stravalib import Client

from tracker.model import Member

logger = logging.getLogger(__name__)


class Strava:
    def __init__(self, client_id, client_secret):
        self.client = Client()
        self.client_id = client_id
        self.client_secret = client_secret

    def _check_and_refresh_token(self, member=None):

        if not member:
            member = Member.objects.filter(refresh_token__gte="").order_by('refresh_token').limit(1)
            member = list(member)[0]

        logger.info("Using access token for: {}".format(member))

        self.client.access_token = member.access_token
        self.client.refresh_token = member.refresh_token
        self.client.token_expires_at = member.access_token_expiry

        # Check if the access token needs renewing.  Should last 6hrs, so only needs doing once regardless of how many calls we make.
        if time.time() > member.access_token_expiry:
            logger.info("Renewing token")
            refresh_response = self.client.refresh_access_token(client_id=self.client_id,
                                                                client_secret=self.client_secret,
                                                                refresh_token=member.refresh_token)
            member.access_token = refresh_response['access_token']
            member.refresh_token = refresh_response['refresh_token']
            member.access_token_expiry = refresh_response['expires_at']
            member.save()

    def register_new_member(self, code):
        token_response = self.client.exchange_code_for_token(client_id=self.client_id,
                                                             client_secret=self.client_secret,
                                                             code=code)
        access_token = token_response['access_token']
        refresh_token = token_response['refresh_token']
        expires_at = token_response['expires_at']

        self.client.access_token = access_token
        self.client.refresh_token = refresh_token
        self.client.token_expires_at = expires_at

        athlete = self.client.get_athlete()
        logger.debug("Retrieved the authenticated athlete: {}".format(athlete))
        return athlete, access_token, refresh_token, expires_at

    def get_member_avatar(self, athlete_id, medium=False):
        logger.debug("Getting an avatar for member {} that is sized {}".format(athlete_id, medium))
        member = Member.objects.get(id=str(athlete_id))
        self._check_and_refresh_token(member)
        athlete = self.client.get_athlete()

        if medium:
            return athlete.profile_medium
        else:
            return athlete.profile

    def get_redirect_url(self, client_id, redirect_url, state):
        return self.client.authorization_url(client_id, redirect_url, state=state)

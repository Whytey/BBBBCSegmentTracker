from flask import Flask, Blueprint
from flask_restful import Resource, marshal, reqparse, Api
from stravalib import Client

import tracker.config as config
from tracker.api.members import member_fields
from tracker.model import Member
from tracker.strava import Strava

BP_NAME = 'connect_api'


class ConnectAPI(Resource):
    def __init__(self):
        self.get_parser = reqparse.RequestParser()
        self.get_parser.add_argument('redirect_url', type=str, required=True,
                                     help='No redirect URL provided', location='args')

        self.post_parser = reqparse.RequestParser()
        self.post_parser.add_argument('code', type=str, required=True,
                                      help='No authentication code provided {error_msg}', location='json')
        super(ConnectAPI, self).__init__()

    def get(self):
        args = self.get_parser.parse_args()
        redirect_url = args.get("redirect_url")
        client = Client()
        authorize_url = client.authorization_url(config.strava_client_id, redirect_url, state="response")
        return {"url": authorize_url}

    def post(self):
        args = self.post_parser.parse_args()
        code = args.get("code")

        strava = Strava()
        athlete, access_token, refresh_token, expires_at = strava.register_new_member(code)

        member = Member.add(athlete, refresh_token, access_token, expires_at)
        return {"member": marshal(member.jsonify(), member_fields)}


app = Flask(__name__)
connect_bp = Blueprint(BP_NAME, __name__)
api = Api(connect_bp)

api.add_resource(ConnectAPI, '/connect')
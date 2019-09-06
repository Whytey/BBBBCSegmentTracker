import logging
import sys

from flask import Flask
from flask_cors import CORS
from flask_restful import Api, Resource, fields, marshal, reqparse
from stravalib import Client

import config
from model import Member, Challenge, Attempt
from strava import Strava

logging.basicConfig(stream=sys.stdout, level=logging.INFO)

app = Flask(__name__)
app.config['SECRET_KEY'] = 'top-secret!'
cors = CORS(app)
api = Api(app)

MEMBERS_ENDPOINT = 'members'
MEMBER_ENDPOINT = 'member'
member_fields = {
    'id': fields.String,
    'first_name': fields.String,
    'last_name': fields.String,
    'uri': fields.Url(MEMBER_ENDPOINT)
}

CONNECT_ENDPOINT = 'connect'

CHALLENGES_ENDPOINT = 'challenges'
CHALLENGE_ENDPOINT = 'challenge'
challenge_fields = {
    'id': fields.String,
    'date_from': fields.DateTime(dt_format='iso8601'),
    'date_to': fields.DateTime(dt_format='iso8601'),
    'segment_id': fields.Integer,
    'segment_name': fields.String,
    'uri': fields.Url(CHALLENGE_ENDPOINT)
}

attempt_fields = {
    'id': fields.String,
    # 'member': fields.Nested(member_fields),
    # 'challenge': fields.Nested(challenge_fields),
    'member_id': fields.String,
    'challenge_id': fields.String,
    'recorded_time_secs': fields.Integer,
    'activity_timestamp': fields.DateTime(dt_format='iso8601'),
    'activity_id': fields.Integer
}


# return {"id": self.id, "member": self.member.jsonify(), "challenge": self.challenge.jsonify(),
#         "recorded_time_secs": self.recorded_time_secs, "activity_timestamp": self.activity_timestamp,
#         "activity_id": self.activity_id}


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


api.add_resource(ConnectAPI, '/api/v1.0/connect', endpoint=CONNECT_ENDPOINT)


class MemberListAPI(Resource):
    def get(self):
        members = Member.objects.all()

        json = []
        for m in members:
            json.append(m.jsonify())

        return {"members": marshal(json, member_fields)}


api.add_resource(MemberListAPI, '/api/v1.0/members', endpoint=MEMBERS_ENDPOINT)


class MemberAPI(Resource):
    def get(self, id):
        member = Member.objects.get(id=id)

        return {"member": marshal(member.jsonify(), member_fields)}


api.add_resource(MemberAPI, '/api/v1.0/members/<int:id>', endpoint=MEMBER_ENDPOINT)


class MemberAvatarAPI(Resource):
    def get(self, id):
        strava = Strava()
        url = strava.get_member_avatar(id)

        return {"avatar": {"url": url}}


api.add_resource(MemberAvatarAPI, '/api/v1.0/members/<int:id>/avatar')


class ChallengeListAPI(Resource):
    def get(self):
        challenges = Challenge.objects.all()

        json = []
        for c in challenges:
            json.append(c.jsonify())

        return {"challenges": marshal(json, challenge_fields)}


api.add_resource(ChallengeListAPI, '/api/v1.0/challenges', endpoint=CHALLENGES_ENDPOINT)


class ChallengeAPI(Resource):
    def get(self, id):
        challenge = Challenge.objects.get(id=id)

        return {"challenge": marshal(challenge.jsonify(), challenge_fields)}


api.add_resource(ChallengeAPI, '/api/v1.0/challenges/<string:id>', endpoint=CHALLENGE_ENDPOINT)


class AttemptsAPI(Resource):
    def get(self, challenge_id):
        challenge = Challenge.objects.get(id=challenge_id)

        attempts = Attempt.objects.filter(challenge=challenge)

        json = []
        for a in attempts:
            json.append(a.jsonify())

        return {"challenge": marshal(challenge, challenge_fields),
                "attempts": marshal(json, attempt_fields)}


api.add_resource(AttemptsAPI, '/api/v1.0/attempts/<string:challenge_id>')


@app.route("/")
def index():
    return app.send_static_file('index.html')


@app.route('/<path:the_path>')
def all_other_routes(the_path):
    return app.send_static_file(the_path)


if __name__ == '__main__':
    app.run(debug=True)

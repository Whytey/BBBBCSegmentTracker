from flask import Flask, request
from flask_cors import CORS
from flask_restful import Api, Resource, fields, marshal, reqparse
from stravalib import Client

import config
from model import Member, Challenge

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


class ConnectAPI(Resource):
    def __init__(self):
        self.get_parser = reqparse.RequestParser()
        self.get_parser.add_argument('redirect_url', type = str, required = True,
                                     help = 'No redirect URL provided', location = 'args')

        self.post_parser = reqparse.RequestParser()
        self.post_parser.add_argument('code', type = str, required = True,
                                      help = 'No authentication code provided {error_msg}', location = 'json')
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
        client = Client()
        token_response = client.exchange_code_for_token(client_id=config.strava_client_id,
                                                        client_secret=config.strava_client_secret,
                                                        code=code)
        access_token = token_response['access_token']
        refresh_token = token_response['refresh_token']
        expires_at = token_response['expires_at']

        client.access_token = access_token
        client.refresh_token = refresh_token
        client.token_expires_at = expires_at

        athlete = client.get_athlete()

        member = Member.add(athlete, refresh_token, access_token, expires_at)
        return {"member": marshal(member.jsonify(), member_fields)}


class MemberListAPI(Resource):
    def get(self):
        members = Member.objects.all()

        json = []
        for m in members:
            json.append(m.jsonify())

        return {"members": marshal(json, member_fields)}


class MemberAPI(Resource):
    def get(self, id):
        member = Member.objects.get(id=id)

        return {"member": marshal(member.jsonify(), member_fields)}


class ChallengeListAPI(Resource):
    def get(self):
        challenges = Challenge.objects.all()

        json = []
        for c in challenges:
            json.append(c.jsonify())

        return {"challenges": marshal(json, challenge_fields)}

class ChallengeAPI(Resource):
    def get(self, id):
        challenge = Challenge.objects.get(id=id)

        return {"challenge": marshal(challenge.jsonify(), challenge_fields)}


api.add_resource(MemberListAPI, '/api/v1.0/members', endpoint=MEMBERS_ENDPOINT)
api.add_resource(MemberAPI, '/api/v1.0/members/<int:id>', endpoint=MEMBER_ENDPOINT)
api.add_resource(ConnectAPI, '/api/v1.0/connect', endpoint=CONNECT_ENDPOINT)
api.add_resource(ChallengeListAPI, '/api/v1.0/challenges', endpoint=CHALLENGES_ENDPOINT)
api.add_resource(ChallengeAPI, '/api/v1.0/challenges/<string:id>', endpoint=CHALLENGE_ENDPOINT)


@app.route("/")
def index():
    return app.send_static_file('index.html')


@app.route('/<path:the_path>')
def all_other_routes(the_path):
    return app.send_static_file(the_path)


#
# @app.route('/attempts/<challenge>', methods=['GET', 'POST'])
# def attempts(challenge):
#     if request.method == 'GET':
#         c = Challenge.objects.get(id=challenge)
#         # attempts = Attempt.objects.filter(challenge=c).get()
#
#         # Need to do the following to filter on only those attempts for the challenge.
#         attempts = Attempt.objects.all()
#         attempts = [a for a in attempts if a.challenge.id == c.id]
#
#         return render_template('attempts.html', challenge=c, attempts=attempts)
#
#     return redirect(url_for('attempts'))
#
#


if __name__ == '__main__':
    app.run(debug=True)

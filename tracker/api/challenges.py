from flask import Flask, Blueprint
from flask_restful import Resource, fields, marshal, Api

from tracker.model import Challenge

BP_NAME = 'challenges_api'
CHALLENGE_ENDPOINT = 'challengeapi'

challenge_fields = {
    'id': fields.String,
    'date_from': fields.DateTime(dt_format='iso8601'),
    'date_to': fields.DateTime(dt_format='iso8601'),
    'segment_id': fields.Integer,
    'segment_name': fields.String,
    'uri': fields.Url("{}.{}".format(BP_NAME, CHALLENGE_ENDPOINT))
}


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


app = Flask(__name__)
challenges_bp = Blueprint(BP_NAME, __name__)
api = Api(challenges_bp)

api.add_resource(ChallengeListAPI, '/challenges')
api.add_resource(ChallengeAPI, '/challenges/<string:id>', endpoint=CHALLENGE_ENDPOINT)

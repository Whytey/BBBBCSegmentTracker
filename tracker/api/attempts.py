from flask import Flask, Blueprint
from flask_restful import Resource, fields, marshal, Api

from tracker.model import Attempt, Challenge
from tracker.api.challenges import challenge_fields

BP_NAME = 'attempts_api'

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


class AttemptsAPI(Resource):
    def get(self, challenge_id):
        challenge = Challenge.objects.get(id=challenge_id)

        attempts = Attempt.objects.filter(challenge=challenge)

        json = []
        for a in attempts:
            json.append(a.jsonify())

        return {"challenge": marshal(challenge, challenge_fields),
                "attempts": marshal(json, attempt_fields)}


app = Flask(__name__)
attempts_bp = Blueprint(BP_NAME, __name__)
api = Api(attempts_bp)

api.add_resource(AttemptsAPI, '/attempts/<string:challenge_id>')

from flask import Flask, Blueprint, current_app
from flask_restful import Resource, fields, marshal, Api

from tracker.model import Member
from tracker.strava import Strava

BP_NAME = 'members_api'
MEMBER_ENDPOINT = 'memberapi'

member_fields = {
    'id': fields.String,
    'first_name': fields.String,
    'last_name': fields.String,
    'uri': fields.Url("{}.{}".format(BP_NAME, MEMBER_ENDPOINT))

}


class MemberListAPI(Resource):
    def get(self):
        members = Member.objects.all()

        json = []
        for m in members:
            json.append(m.jsonify())
        print(json)

        return {"members": marshal(json, member_fields)}


class MemberAPI(Resource):
    def get(self, id):
        member = Member.objects.get(id=id)

        return {"member": marshal(member.jsonify(), member_fields)}


class MemberAvatarAPI(Resource):
    def __init__(self):
        self.app = current_app
        self.strava = Strava(self.app.config['STRAVA_CLIENT_ID'], self.app.config['STRAVA_CLIENT_SECRET'])

    def get(self, id):
        url = self.strava.get_member_avatar(id)

        return {"avatar": {"url": url}}


app = Flask(__name__)
members_bp = Blueprint(BP_NAME, __name__)
api = Api(members_bp)

api.add_resource(MemberListAPI, '/members')
api.add_resource(MemberAPI, '/members/<int:id>', endpoint=MEMBER_ENDPOINT)
api.add_resource(MemberAvatarAPI, '/members/<int:id>/avatar')

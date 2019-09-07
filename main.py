import logging
import sys

from flask import Flask
from flask_cors import CORS

from tracker.api.attempts import attempts_bp
from tracker.api.challenges import challenges_bp
from tracker.api.connect import connect_bp
from tracker.api.members import members_bp

logging.basicConfig(stream=sys.stdout, level=logging.INFO)


def create_app(environment=None):
    app = Flask(__name__)
    cors = CORS(app)

    app.register_blueprint(connect_bp, url_prefix='/api/v1.0')
    app.register_blueprint(members_bp, url_prefix='/api/v1.0')
    app.register_blueprint(challenges_bp, url_prefix='/api/v1.0')

    @app.route("/")
    def index():
        return app.send_static_file('index.html')

    @app.route('/<path:the_path>')
    def all_other_routes(the_path):
        return app.send_static_file(the_path)

    return app


app = create_app()

if __name__ == '__main__':
    app.run(debug=True)

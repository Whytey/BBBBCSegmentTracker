from flask import Flask

from tracker.api.connect import connect_bp
from tracker.api.members import members_bp


def create_app(environment=None):
    app = Flask(__name__)

    app.register_blueprint(connect_bp, url_prefix='/api/v1.0')
    app.register_blueprint(members_bp, url_prefix='/api/v1.0')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)

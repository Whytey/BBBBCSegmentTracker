class Config:
    # The Client ID as registered at https://www.strava.com/settings/api
    STRAVA_CLIENT_ID = 123456

    # The Client Secret as registered at https://www.strava.com/settings/api
    STRAVA_CLIENT_SECRET = 'secret_key'

    # The ID of the Strava group that this challenge page is for
    STRAVA_GROUP_ID = 123456

    # A list of Member IDs (i.e. Strava athlete IDs) that can do admin functions
    ADMIN_MEMBER_IDS = [1234, 5678]

    # Path to the service account file to enable access to the Firestore data
    FIRESTORE_SERVICE_ACCOUNT = 'instance/bbbbc-firestore.json'

    # URL to the api endpoints, either absolute or relative.
    API_URL = 'http://127.0.0.1:5000/api'


class Production(Config):
    ENV = 'prod'
    DEBUG = False

    API_URL = '/api'


class Development(Config):
    ENV = 'dev'
    DEBUG = True
    API_URL = 'http://127.0.0.1:5000/api'


class Testing(Config):
    TESTING = True
    DEBUG = True

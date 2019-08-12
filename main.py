from flask import Flask, request, render_template, redirect, url_for, flash
from playhouse.flask_utils import FlaskDB
from stravalib import Client

import config
from db import db, Member, Segment, Attempt

app = Flask(__name__)
app.config['SECRET_KEY'] = 'top-secret!'

db_wrapper = FlaskDB(app, db)


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        return render_template('index.html', segment={"name": "Test Segment", "id": 1234})

    return redirect(url_for('index'))


@app.route('/members', methods=['GET', 'POST'])
def members():
    if request.method == 'GET':
        members = Member.select()

        return render_template('members.html', members=members)

    return redirect(url_for('members'))


@app.route('/segments', methods=['GET', 'POST'])
def segments():
    if request.method == 'GET':
        segments = Segment.select()

        return render_template('segments.html', segments=segments)

    return redirect(url_for('segments'))


@app.route('/segment/<segment>', methods=['GET', 'POST'])
def segment(segment):
    if request.method == 'GET':
        s = (Segment.select().where(Segment.id == segment)).get()
        attempts = Attempt.select(Attempt.effort_id, Member.first_name).join(Member).dicts()
        for a in attempts:
            print(a)

        return render_template('attempts.html', segment=s, attempts=attempts)

    return redirect(url_for('segment'))


@app.route('/connect', methods=['GET', 'POST'])
def connect():
    if request.method == 'GET':
        state = request.args.get('state')
        if state == 'response':
            # We've returned from the strava authentication call.
            error_msg = request.args.get('error', None)
            if error_msg:
                # We didn't actually authenticate.
                return render_template('connect.html', error=error_msg)

            # We must have been sucessful
            code = request.args.get('code')

            client = Client()
            token_response = client.exchange_code_for_token(client_id=config.strava_client_id,
                                                            client_secret=config.strava_client_secret,
                                                            code=code)
            access_token = token_response['access_token']
            refresh_token = token_response['refresh_token']
            expires_at = token_response['expires_at']

            # Now store that short-lived access token somewhere (a database?)
            client.access_token = access_token
            # You must also store the refresh token to be used later on to obtain another valid access token
            # in case the current is already expired
            client.refresh_token = refresh_token

            # An access_token is only valid for 6 hours, store expires_at somewhere and
            # check it before making an API call.
            client.token_expires_at = expires_at

            athlete = client.get_athlete()

            Member.update(last_name=athlete.lastname, first_name=athlete.firstname, athlete_id=athlete.id,
                          refresh_token=refresh_token, access_token=access_token, access_token_expiry=expires_at)


            flash('You were successfully connected.  Welcome {}!'.format(athlete.firstname))

            return redirect(url_for('index'))

        client = Client()
        authorize_url = client.authorization_url(config.strava_client_id, config.redirect_url, state="response")

        return render_template('connect.html', target_url=authorize_url)

    return redirect(url_for('connect'))


if __name__ == '__main__':
    db.create_tables([Member, Segment, Attempt])
    app.run(debug=True)

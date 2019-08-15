from flask import Flask, request, render_template, redirect, url_for, flash
from stravalib import Client

import config
from model import Member, Challenge, Attempt

app = Flask(__name__)
app.config['SECRET_KEY'] = 'top-secret!'


# db_wrapper = FlaskDB(app, db)


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        return render_template('index.html', segment={"name": "Test Segment", "id": 1234})

    return redirect(url_for('index'))


@app.route('/members', methods=['GET', 'POST'])
def members():
    if request.method == 'GET':
        members = Member.objects.all()

        return render_template('members.html', members=members)

    return redirect(url_for('members'))


@app.route('/challenges', methods=['GET', 'POST'])
def challenges():
    if request.method == 'GET':
        challenges = Challenge.objects.all()

        return render_template('challenges.html', challenges=challenges)

    return redirect(url_for('challenges'))


@app.route('/attempts/<challenge>', methods=['GET', 'POST'])
def attempts(challenge):
    if request.method == 'GET':
        c = Challenge.objects.get(id=challenge)
        # attempts = Attempt.objects.filter(challenge=c).get()

        # Need to do the following to filter on only those attempts for the challenge.
        attempts = Attempt.objects.all()
        attempts = [a for a in attempts if a.challenge.id == c.id]

        return render_template('attempts.html', challenge=c, attempts=attempts)

    return redirect(url_for('attempts'))


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

            client.access_token = access_token
            client.refresh_token = refresh_token
            client.token_expires_at = expires_at

            athlete = client.get_athlete()

            # Member.objects.create(last_name=athlete.lastname, first_name=athlete.firstname, id=athlete.id,
            #                       refresh_token=refresh_token, access_token=access_token,
            #                       access_token_expiry=expires_at)
            m = Member.add(athlete, refresh_token, access_token, expires_at)


            flash('You were successfully connected.  Welcome {}!'.format(athlete.firstname))

            return redirect(url_for('index'))

        client = Client()
        authorize_url = client.authorization_url(config.strava_client_id, request.base_url, state="response")

        return render_template('connect.html', target_url=authorize_url)

    return redirect(url_for('connect'))


if __name__ == '__main__':
    app.run(debug=True)

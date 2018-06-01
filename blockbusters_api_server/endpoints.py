import os
from app import app, db
from models import Vote
from flask import request, session, jsonify, make_response, send_from_directory

from sqlalchemy.sql import func


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    app.logger.info('got req for path: {}'.format(path))
    #app.logger.info(os.path.split(path))
    # path = os.path.join(os.path.split(path)[1:])
    app.logger.info('path {}'.format(path))
    if path in {'', 'player', 'player/voting'}:
        path = 'index.html'
    return send_from_directory(os.path.join(app.root_path, 'frontend'), path)


default_header = {
    'Content-Type': 'application/json'
}


@app.route('/login', methods=['POST'])
def user_login():
    req = request.json
    app.logger.info('got login request {}'.format(req))
    if 'user' not in req:
        return make_response(jsonify(status='Error', error='Missing user field in request'), 401)
    if 'team' not in req:
        return make_response(jsonify(status='Error', error='Missing team field in request'), 401)

    session['user'] = req['user']
    session['team'] = req['team']
    return make_response(jsonify(status='OK'), 200, default_header)


@app.route('/user/vote', methods=['POST'])
def user_vote():
    if 'user' not in session or 'team' not in session:
        return jsonify(status='Error', error='User is not logged in')

    req = request.json
    value = req.get('value')
    if value is None:
        return make_response(jsonify(status='Error', error='Missing value field in request'), 401)

    try:
        db.session.add(Vote(user=session['user'], team=session['team'], value=value))
        db.session.commit()
    except Exception as e:
        return make_response(jsonify(status='Error',
                                     error='You cannot vote twice in the same round, wait for the next question'), 401)

    return jsonify(status='OK')


@app.route('/question/begin')
def question_begin():
    # Clear all old votes
    Vote.query.delete()
    db.session.commit()
    return jsonify(status='OK')


@app.route('/question/finish')
def question_finish():
    votes = db.session.query(Vote.team, Vote.value, func.count(Vote.value)).group_by(Vote.team, Vote.value).all()

    vote_per_team = {}
    for team, value, num in votes:
        curr_vote, curr_num = vote_per_team.get(team, (None, 0))
        if num > curr_num:
            vote_per_team[team] = (value, num)

    Vote.query.delete()
    db.session.commit()

    return jsonify(status='OK', response={team: val[0] for team, val in vote_per_team.items()})

from app import app, db
from models import Vote
from flask import request, session, jsonify, make_response

from sqlalchemy.sql import func


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
    return jsonify(status='OK')


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
        return make_response(jsonify(status='Error', error=str(e)), 401)

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

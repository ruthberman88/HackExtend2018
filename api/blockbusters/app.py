from flask import Flask, session, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)
socketio = SocketIO(app)


@app.route('/user/team', methods=['POST'])
def user_team_set():
    req = request.json
    app.logger.info('got request {}'.format(req))
    session['team'] = req.get('team', 'blue')
    app.logger.info('session after is {}'.format(session))
    return jsonify(status='OK')


@app.route('/user/vote', methods=['POST'])
def user_vote():
    return jsonify(status='OK')


@app.route('/question/begin')
def question_begin():
    return jsonify(status='OK')


@app.route('/question/finish')
def question_finish():
    return jsonify(status='OK',
                   response=dict(
                       a=1,
                       b=0,
                       c=0
                   ))


# @socketio.on('my event', namespace='/test')
# def test_message(message):
#     emit('my response', {'data': message['data']})
#
#
# @socketio.on('my broadcast event', namespace='/test')
# def test_message(message):
#     emit('my response', {'data': message['data']}, broadcast=True)
#
#
# @socketio.on('connect', namespace='/test')
# def test_connect():
#     emit('my response', {'data': 'Connected'})
#
#
# @socketio.on('disconnect', namespace='/test')
# def test_disconnect():
#     print('Client disconnected')


if __name__ == '__main__':
    socketio.run(app)




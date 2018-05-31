from app import db


class Vote(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user = db.Column(db.String(80), unique=True)
    team = db.Column(db.String(80))
    value = db.Column(db.String(10))

    def __repr__(self):
        return '<Vote user={} value={}>'.format(self.user, self.value)

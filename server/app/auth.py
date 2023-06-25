import functools
import json
from flask import (
    jsonify,
    Blueprint,
    flash,
    g,
    redirect,
    render_template,
    request,
    session,
    url_for
)
from werkzeug.security import (
    check_password_hash,
    generate_password_hash,
)
from .database import get_db
from .database.models import User
from sqlalchemy.exc import IntegrityError

bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('/register', methods=('GET', 'POST'))
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        db = get_db()
        err = None

        if not username:
            err = 'Username is required'
        elif not password:
            err = 'Password is required'

        if err is None:
            try:
                user = User(username=username, password=generate_password_hash(password))
                db.session.add(user)
                db.session.commit()
            except IntegrityError as e:
                db.session.rollback()
                err = f'User {username} is already registered.'
            else:
                return redirect(url_for("auth.login"))
        flash(err)

    return render_template('auth/register.html')


@bp.route('/login', methods=('GET', 'POST'))
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        err = None

        user = User.query.filter_by(username=username).first()

        if user is None:
            err = 'Incorrect username'
        elif not check_password_hash(user.password, password):
            err = 'Incorrect password.'

        if err is None:
            session.clear()
            session['user_id'] = user.id
            return redirect(url_for('cards'))

        flash(err)

    return render_template('auth/login.html')

@bp.route('/register_modal', methods=['POST'])
def register_modal():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']
        phone_num = request.form['phone']

        data_json = json.dumps({'email': email, 'phone_num': phone_num})

        db = get_db()
        err = None

        if not username:
            err = 'Username is required'
        elif not password:
            err = 'Password is required'

        if err is None:
            try:
                user = User(username=username, password=generate_password_hash(password), userData=data_json)
                db.session.add(user)
                db.session.commit()
            except IntegrityError as e:
                db.session.rollback()
                err = f'User {username} is already registered.'
            else:
                return redirect(url_for("cards"))
        flash(err)


@bp.route('/login_modal', methods=['POST'])
def login_modal():
    if request.method == 'POST':
        print(request.form)
        username = request.form['username']
        password = request.form['password']
        err = None

        user = User.query.filter_by(username=username).first()

        if user is None:
            err = 'Incorrect username'
        elif not check_password_hash(user.password, password):
            err = 'Incorrect password.'

        if err is None:
            session.clear()
            session['user_id'] = user.id
            return redirect(url_for('cards'))

        flash(err)



@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        print(user_id)
        g.user = User.query.filter_by(id=user_id).first()


@bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))


def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('auth.login'))
        return view(**kwargs)

    return wrapped_view

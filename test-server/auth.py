import functools

import psycopg2.extras
from flask import (
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

bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('/register', methods=('GET', 'POST'))
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        database = get_db()
        err = None

        if not username:
            err = 'Username is required'
        elif not password:
            err = 'Password is required'

        if err is None:
            try:
                with database.cursor() as cur:
                    cur.execute(
                        "INSERT INTO user_name (username, password) VALUES (%s, %s)",
                        (username, generate_password_hash(password))
                    )
                    database.commit()
            except database.IntegrityError:
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
        db = get_db()
        err = None

        user = None
        with db.cursor(cursor_factory=psycopg2.extras.DictCursor) as cur:
            cur.execute(
                "SELECT * FROM user_name WHERE username = %s", (username,)
            )
            user = cur.fetchone()
        if user is None:
            err = 'Incorrect username'
        elif not check_password_hash(user['password'], password):
            err = 'Incorrect password.'

        if err is None:
            session.clear()
            session['user_id'] = user['id']
            return redirect(url_for('index'))

        flash(err)

    return render_template('auth/login.html')


@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        with get_db().cursor() as cur:
            cur.execute(
                'SELECT * FROM user_name WHERE id = %s', (user_id,)
            )
            g.user = cur.fetchone()


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

from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort

from .auth import login_required
from .database import get_db

bp = Blueprint('blog', __name__)

@bp.route('/')
def index():
    return render_template('index.html')

@bp.route('/card')
def card():
    return render_template('card.html')

@bp.route('/api_test')
def api_test():
    return render_template('api_test.html')

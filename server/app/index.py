from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort

from .auth import login_required
from .database import get_db

bp = Blueprint('card_pages', __name__, template_folder='templates')

@bp.route('/')
def index():
    return render_template('index.html')

@bp.route('/card')
def card():
    return render_template('card.html')

@bp.route('/cards')
def cards():
    return render_template('cards.html')

@bp.route('/profile')
def profile():
    return render_template('profile.html')

@bp.route('/api_test')
def api_test():
    return render_template('api_test.html')

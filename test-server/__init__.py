import os
from flask import Flask
from .models import db

def create_app(test_config=None):
    app = Flask(
        __name__,
        instance_relative_config=True,
    )
    app.config.from_mapping(
        SECRET_KEY='lol',
        DATABASE=os.path.join(app.instance_path, 'server-engine.sql'),
        SQLALCHEMY_DATABASE_URI=f"",
        SQLALCHEMY_TRACK_MODIFICATIONS=False
    )

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError as ex:
        print(ex)

    @app.route('/hello')
    def say_hello():
        return 'Hey, this is flask-server!'

    from . import database
    database.init_app(app)
    db.init_app(app)
    #with app.app_context():
        #db.drop_all()
        #db.create_all()
    from . import auth
    app.register_blueprint(auth.bp)

    from . import index
    app.register_blueprint(index.bp)
    app.add_url_rule('/', endpoint='index')

    return app

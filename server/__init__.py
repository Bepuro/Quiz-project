import os
from flask import Flask
from flask_migrate import Migrate
from server.app import db


migrate = Migrate()

def create_app(test_config=None):
    app = Flask(
        __name__,
        instance_relative_config=True,
    )
    app.config.from_mapping(
        SECRET_KEY='lol',
        SQLALCHEMY_DATABASE_URI=f"",
        SQLALCHEMY_TRACK_MODIFICATIONS=False
    )

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)


    @app.route('/hello')
    def say_hello():
        return 'Hey, this is flask-server!'

    from .app import database
    database.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)

    from .app import auth
    app.register_blueprint(auth.bp)

    from .app import index
    app.register_blueprint(index.bp)
    app.add_url_rule('/', endpoint='index')

    from .app import api
    app.register_blueprint(api.bp)

    return app


if __name__ == '__main__':
    app = create_app()
    app.run()

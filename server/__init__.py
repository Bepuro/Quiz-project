import os
from flask import Flask
from server.models import db


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

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route('/hello')
    def say_hello():
        return 'Hey, this is flask-server!'

    import server.database as database
    database.init_app(app)
    db.init_app(app)

    import server.auth as auth
    app.register_blueprint(auth.bp)

    import server.index as index
    app.register_blueprint(index.bp)
    app.add_url_rule('/', endpoint='index')

    import server.api as api
    app.register_blueprint(api.bp)

    return app


if __name__ == '__main__':
    app = create_app()
    app.run()

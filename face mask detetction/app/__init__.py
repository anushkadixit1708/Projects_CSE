from flask import Flask

from app.errors.routes import error_404, error_403, error_401, error_500


def create_app():
    app = Flask(__name__)

    # Retrieve configuration information
    app.config.from_object('app.config.Config')

    # Initialization of blueprints
    from app.main import main_bp

    # Error handlers
    app.register_error_handler(404, error_404)
    app.register_error_handler(403, error_403)
    app.register_error_handler(401, error_401)
    app.register_error_handler(500, error_500)

    app.register_blueprint(main_bp)
    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)

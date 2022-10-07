from flask import Blueprint

errors_bp = Blueprint("errors", __name__)

import app.errors.routes

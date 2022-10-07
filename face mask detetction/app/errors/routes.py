from flask import render_template
from . import errors_bp


@errors_bp.errorhandler(404)
def error_404(e):
    return render_template("error.html", error="404"), 404


@errors_bp.errorhandler(500)
def error_500(e):
    return render_template("error.html", error="500"), 500


@errors_bp.errorhandler(403)
def error_403(e):
    return render_template("error.html", error="403"), 403


@errors_bp.errorhandler(401)
def error_401(e):
    return render_template("error.html", error="401"), 401

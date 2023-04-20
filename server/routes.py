from flask import Flask, request, jsonify, url_for, Blueprint, session
from models import User, db
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_cors import CORS, cross_origin

api = Blueprint('api', __name__)
app = Flask(__name__)
# CONFIGURING JSON WEB TOKENS
app.config["JWT_SECRET_KEY"] = "supegiunyyggvjhret"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///music_app.db"

jwt = JWTManager(app)
app.register_blueprint(api)
# HASHING THE PASSWORD
bcrypt = Bcrypt(app)
# CREATING A SESSION FOR OUR USER MODEL
server_session = Session(app)
db.init_app(app)
# CROSS RESOURCE ORIGIN POLICY CONFIGURATION
CORS(app, supports_credentials=True)
with app.app_context():
    db.create_all()

@app.route("/register", methods=["POST"])
def register():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    if not username or not password:
        return jsonify({"msg": "Username and password are required"}), 400

    user = User.query.filter_by(username=username).first()
    if user:
        return jsonify({"msg": "Username already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token, user={"id": new_user.id, "username": new_user.username}), 201


@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    if not username or not password:
        return jsonify({"msg": "Username and password are required"}), 400

    user = User.query.filter_by(username=username).first()
    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 200
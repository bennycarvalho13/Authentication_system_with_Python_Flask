"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)

@api.route('/sign_up', methods=['POST'])
def sign_up():
    user_data = request.get_json()
    
    # We create an instance without being recorded in the database
    user = User()
    user.email = user_data["email"]
    user.password = user_data["password"]
    user.is_active = True

    # We tell the database we want to record this user
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "The user has been created successfully"}), 200

@api.route('/token', methods=['POST'])
def create_token():
    user_data = request.get_json()

    email = user_data.get("email", None)
    password = user_data.get("password", None)

    user = User.query.filter_by(email=email).one_or_none()
    if not user or not user.check_password(password):
        return jsonify( {"message": "Wrong username or password"}), 401
    
    # Notice that we are passing in the actual sqlalchemy user object here
    access_token = create_access_token(identity=user.serialize())
    return jsonify(access_token=access_token)

@api.route('/hello', methods=['GET'])
@jwt_required()
def get_hello():

    email = get_jwt_identity()
    json = {
        "message" : str(email["email"])
    }
    return jsonify(json)



#pipenv run migrate )
#                   ) <- first bash
#pipenv run upgrade )

# npm run start <- second bash
# pipenv run start <- third bash
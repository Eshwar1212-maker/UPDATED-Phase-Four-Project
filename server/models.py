from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from uuid import uuid4


db = SQLAlchemy()


def get_uuid4():
    return uuid4().hex


class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    serialize_rules = ('-password', '-requests.user', '-requests.user_id', '-requests.id')
    id = db.Column(db.String(32), primary_key=True,
                   unique=True, default=get_uuid4)
    username = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text, nullable=False)
    user_requests = db.relationship('Request', backref='request_user')
    tracks = db.relationship('Track', secondary='requests', backref='users',
    primaryjoin='and_(User.user_id==Request.user_id, Request.track_id==Track.track_id)')
    
                             
class Track(db.Model, SerializerMixin):
    __tablename__="tracks"
    serialize_rules = ('-users.date_created', '-requests.date_created')
    track_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    artist_name = db.Column(db.String(255), nullable=False)
    album_name = db.Column(db.String(255))
    duration = db.Column(db.Integer, nullable=False)
    genre = db.Column(db.String(255))
    users = db.relationship('UserTrack', back_populates='track', lazy=True)
    requests = db.relationship('TrackRequest', back_populates='track', lazy=True)
class Request(db.Model, SerializerMixin):
    __tablename__="requests"
    serialize_rules =('-user.requests', '-user.password', '-user.requests.user_id', '-tracks.request_id')
    request_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    artist_name = db.Column(db.String(255), nullable=False)
    notes = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    track_id = db.Column(db.Integer, db.ForeignKey('tracks.track_id'), nullable=False)
    user = db.relationship('User', back_populates='user_requests', lazy=True)
    tracks = db.relationship('TrackRequest', back_populates='request', lazy=True)
class UserTrack(db.Model, SerializerMixin):
    __tablename__="user_tracks"
    serialize_rules = ('-user.password', '-track.users', '-track.requests')
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), primary_key=True)
    track_id = db.Column(db.Integer, db.ForeignKey('tracks.track_id'), primary_key=True)
    date_created = db.Column(db.Date, nullable=False)
    plays = db.Column(db.Integer, default=0)
    likes = db.Column(db.Integer, default=0)
    user = db.relationship('User', back_populates='tracks', lazy=True)
    track = db.relationship('Track', back_populates='users', lazy=True)
class UserRequest(db.Model, SerializerMixin):
    __tablename__="user_requests"
    serialize_rules = ('-user.password', '-request.tracks', '-request.user.password', '-request.user.requests')
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), primary_key=True)
    request_id = db.Column(db.Integer, db.ForeignKey('requests.request_id'), primary_key=True)
    date_created = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(255))
    user = db.relationship('User', back_populates='user_requests', lazy=True)
    request = db.relationship('Request', back_populates='user', lazy=True)
class TrackRequest(db.Model, SerializerMixin):
    __tablename__="track_requests"
    serialize_rules = ('-track.users', '-track.requests.user', '-track.requests.user_id', '-request.track_id')
    request_id = db.Column(db.Integer, db.ForeignKey('requests.request_id'), primary_key=True)
    track_id = db.Column(db.Integer, db.ForeignKey('tracks.track_id'), primary_key=True)
    track = db.relationship('Track', back_populates='requests')
    request = db.relationship('Request', back_populates='tracks')
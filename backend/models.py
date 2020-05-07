import os
from sqlalchemy import Column, String, Integer, create_engine, Boolean
from sqlalchemy.sql import expression
from flask_sqlalchemy import SQLAlchemy
import json
from flask_migrate import Migrate

database_name = "todo2"
database_path = "postgres://{}@{}/{}".format(
    'postgres', '127.0.0.1:5432', database_name)

db = SQLAlchemy()


def setup_db(app, database_path=database_path):
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)
    migrate = Migrate(app, db)


class Todo(db.Model):
    __tablename__ = 'todos'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    completed = Column(Boolean, default=False, nullable=False)
  
    def __init__(self, name):
        self.name = name

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def close(self):
        db.session.close()

    def rollback(self):
        db.session.rollback()

    def format(self):
        return {
            'id': self.id,
            'name': self.name
        }

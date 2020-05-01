import os
import sys
from flask import Flask, request, abort, jsonify, url_for, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
import random

from models import setup_db, Todo


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__)
    setup_db(app)
    CORS(app)

    # CORS Headers
    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Headers',
                             'Content-Type,Authorization,true')
        response.headers.add('Access-Control-Allow-Methods',
                             'GET,PUT,POST,DELETE,OPTIONS')
        return response

    @app.route('/')
    def index():
        return redirect(url_for('get_todos'))

    @app.route('/todos', methods=['POST'])
    @cross_origin()
    def create_todo():
        try:
            name = request.get_json()['name']
            todo = Todo(name=name)
            todo.insert()
            todo.close()
        except:
            abort(422)
        return jsonify({'success': 'success'})

    @app.route('/todos/<todo_id>', methods=['DELETE'])
    @cross_origin()
    def delete_todo(todo_id):
        try:
            todo = Todo.query.filter(Todo.id == todo_id).one_or_none()
            todo.delete()
            todo.close()
        except:
            abort(422)
        return redirect(url_for('get_todos'))

    @app.route('/todos', methods=['GET'])
    def get_todos():
        try:
            todos = Todo.query.all()
            formatted_todos = [todo.format() for todo in todos]
        except:
            abort(422)
        return jsonify({'success': 'success', 'todos': formatted_todos})

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            "success": False,
            "error": 404,
            "message": "Not found"
        }), 404

    @app.errorhandler(422)
    def unprocessable(error):
        return jsonify({
            "success": False,
            "error": 422,
            "message": "Unprocessable"
        }), 422

    @app.errorhandler(405)
    def method_not_allowed(error):
        return jsonify({
            "success": False,
            "error": 405,
            "message": "Method not allowed"
        }), 405

    return app

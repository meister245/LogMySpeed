#!/usr/bin/env python3

import os
import sys
import json
from os.path import realpath, dirname, join, isdir, getsize

from flask import Flask, request

if __name__ == '__main__':
    sys.path.append(realpath(join(dirname(__file__), '..')))

from app.controller.db import DBController

PREFIX = '/api'
DB_NAME = 'log-my-speed.sqlite'
RESOURCES_DIR = realpath(join(dirname(__file__), '..', 'resources'))

flask_app = Flask(__name__, static_folder=join(RESOURCES_DIR, 'static'))

if not isdir(join(RESOURCES_DIR, 'db')):
    os.mkdir(join(RESOURCES_DIR, 'db'))

db = DBController('sqlite:///' + join(RESOURCES_DIR, 'db', DB_NAME))

if getsize(join(RESOURCES_DIR, 'db', DB_NAME)) == 0:
    db.create_tables(db.engine)


@flask_app.route('/')
def root():
    return flask_app.send_static_file('index.html')


@flask_app.route(PREFIX + '/data', methods=['GET', 'POST', 'DELETE'])
def data():
    if request.method == 'GET':
        conn_type = request.args.get('type', '').capitalize()
        return json.dumps(db.obj_to_dict(conn_type, 5))

    elif request.method == 'POST' and request.headers.get('Content-Type', '') == 'application/json':
        db.update_item(**{'remote_addr': request.remote_addr, **request.get_json()})
        return 'New item created, 201 Created'

    elif request.method == 'DELETE':
        db.drop_tables(db.engine)
        db.create_tables(db.engine)
        return 'DB reset'


if __name__ == '__main__':
    flask_app.run(host='127.0.0.1', debug=True, port=9000, use_reloader=True)

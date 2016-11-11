from os.path import isfile
import json

from flask import Flask, request

from services.db_service import DBService
from utilities.db_tools import create_tables, drop_tables

app = Flask(__name__, static_folder='../static')

# database connection
conn_param = 'sqlite:///utilities/speedmap.sqlite'

# class instances
db_service = DBService(conn_param)

# # db tables
# if conn_param.startswith('sqlite'):
#     if isfile(conn_param[9:]) is False:
#         drop_tables(db_service.engine)
#         create_tables(db_service.engine)


# flask functions
@app.route('/')
def root():
    return app.send_static_file('index.html')


@app.route('/submit', methods=['POST'])
def get_data():
    data = request.get_json()
    data['remote_addr'] = request.remote_addr
    if len(data) > 0:
        db_service.update_item(data)
        return 'New item created, 201 Created'
    else:
        return '400 Bad Request'


@app.route('/data', methods=['GET'])
def send_json():
    conn_type = request.args.get('type').capitalize()
    return json.dumps(db_service.obj_to_dict(conn_type, 5))


if __name__ == '__main__':
    app.run(debug=True, port=9000, use_reloader=False)

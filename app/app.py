from os.path import isfile
import json

from flask import Flask, request

from services.db_service import DBService
from utilities.db_tools import DBTools

app = Flask(__name__, static_folder='../static')

conn_param = 'sqlite:///utilities/speedmap.sqlite'
db_tool = DBTools(conn_param)
db_service = DBService(db_tool.db)

if conn_param.startswith('sqlite'):
    if isfile(conn_param[9:]) is False:
        db_tool.drop_tables()
        db_tool.create_tables()
        db_tool.generate_items(30)


@app.route('/')
def root():
    return app.send_static_file('index.html')


@app.route('/testresult', methods=['POST'])
def get_test_result():
    data = request.get_json()
    db_service.create_item(data)
    print data
    if len(data) > 0:
        return 'HTTP 201 Created'
    else:
        return 'HTTP 400 Bad Request'


@app.route('/wifi', methods=['GET'])
def send_wifi_data():
    return db_tool.send_json('Wi-fi')


@app.route('/ethernet', methods=['GET'])
def send_ethernet_data():
    return db_tool.send_json('Ethernet')


if __name__ == '__main__':
    app.run(debug=True, port=9000, use_reloader=True)
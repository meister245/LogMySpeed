from os.path import isfile
import json

from flask import Flask, request
from flask_cors import CORS

from services.db_service import DBService
from utilities.dbtools import DBTools

app = Flask(__name__, static_folder='../static')
CORS(app)

conn_param = 'sqlite:///utilities/speedmap.sqlite'
dbtool = DBTools(conn_param)
dbservice = DBService(dbtool.db)

if conn_param.startswith('sqlite'):
    if isfile(conn_param[9:]) is False:
        dbtool.drop_tables()
        dbtool.create_tables()
        dbtool.generate_items(30)


@app.route('/')
def root():
    return app.send_static_file('index.html')


@app.route('/testresult', methods=['GET', 'POST'])
def get_test_result():
    result = json.loads(request.get_json())
    print result


@app.route('/wifi', methods=['GET', 'POST'])
def send_wifi_data():
    return dbtool.send_json('Wi-fi')


@app.route('/ethernet', methods=['GET', 'POST'])
def send_ethernet_data():
    return dbtool.send_json('Ethernet')

if __name__ == '__main__':
    app.run(debug=True)

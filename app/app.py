from os.path import isfile

from flask import Flask, request

from services.db_service import DBService
from utilities.db_tools import create_tables, drop_tables, generate_items

app = Flask(__name__, static_folder='../static')

# database connection
conn_param = 'sqlite:///utilities/speedmap.sqlite'

# class instances
db_service = DBService(conn_param)

# development
if conn_param.startswith('sqlite'):
    if isfile(conn_param[9:]) is False:
        drop_tables(db_service.engine)
        create_tables(db_service.engine)
        # generate_items(db_service.db, 30)


# flask functions
@app.route('/')
def root():
    return app.send_static_file('index.html')


@app.route('/submit', methods=['POST'])
def get_data():
    data = request.get_json()
    app.logger.info(data)
    if len(data) > 0:
        db_service.update_item(data)
        return 'New item created, 201 Created'
    else:
        return '400 Bad Request'


@app.route('/data', methods=['GET'])
def send_json():
    conn_type = request.args.get('type').capitalize()
    return db_service.data_to_json(conn_type)


if __name__ == '__main__':
    app.run(debug=True, port=9000, use_reloader=True)

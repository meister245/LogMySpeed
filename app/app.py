from os.path import isfile

from flask import Flask

from services.db_service import DBService
from utilities.dbtools import DBTools

app = Flask(__name__, static_folder='../static')

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


if __name__ == '__main__':
    app.run(debug=True)

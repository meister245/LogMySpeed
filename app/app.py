from flask import Flask

from services.db_service import DBService
from utilities.dbtools import DBTools

app = Flask(__name__, static_folder='../static')

conn_param = 'sqlite:///utilities/speedmap.sqlite'
dbtool = DBTools(conn_param)
dbservice = DBService(dbtool.connect_db())

dbtool.create_tables()


@app.route('/')
def root():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(debug=True)
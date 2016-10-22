from flask import Flask

from utilities.dbtools import DBTools

app = Flask(__name__)

conn_param = 'sqlite:///utilities/speedmap.sqlite'
db = DBTools(conn_param)

db.create_tables()

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)
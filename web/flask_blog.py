from flask import Flask, request
from flask import render_template

app = Flask(__name__)

from flask_config.settings import *

@app.route('/')
def hello_world():
    page = request.args.get('page', False)
    api_source = API_SOURCE
    if page: 
        api_source = "%s&page=%s" % (api_source, page)
    return render_template('index.html', domain=DOMAIN, api_source=api_source)

#url_for('static', filename='js/blog.js')

if __name__ == '__main__':
    app.run(debug=True)


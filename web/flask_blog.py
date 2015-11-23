from flask import Flask, request
from flask import render_template

app = Flask(__name__)

from flask_config.settings import *

@app.route('/')
def index():
    page = request.args.get('page', None)
    api_source = API_INDEX
    if page: 
        api_source = "%s&page=%s" % (api_source, page)
    return render_template('index.html', domain=DOMAIN, api_source=api_source)

@app.route('/post/<int:post_id>')
def detail(post_id):
    api_source = API_DETAIL + str(post_id)
    return render_template('detail.html', domain=DOMAIN, api_source=api_source)

#url_for('static', filename='js/blog.js')

if __name__ == '__main__':
    app.run(debug=True)


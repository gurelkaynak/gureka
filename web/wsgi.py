import sys, os

activate_this = os.path.dirname(os.path.abspath(__file__)) + '/env/bin/activate_this.py'
execfile(activate_this, dict(__file__=activate_this))

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))


from flask_blog import app as application


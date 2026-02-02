import sys
import site
import os

site.addsitedir('/var/www/exsamen/env/lib/python3.13/site-packages')

sys.path.insert(0, '/var/www/exsamen')

os.chdir('/var/www/exsamen')

os.environ['VIRTUAL_ENV'] = '/var/www/exsamen/env'
os.environ['PATH'] = '/var/www/exsamen/env/bin:' + os.environ['PATH']

from app import app as application

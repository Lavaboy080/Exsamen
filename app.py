from flask import Flask, render_template
import datetime

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html")

@app.route('/cookie')
def cookie():
    return render_template("cookie.html")

@app.route('/pong')
def pong():
    return render_template("pong.html")

if __name__ == "__main__":
    app.run()

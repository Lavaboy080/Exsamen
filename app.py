from flask import Flask, render_template
import datetime

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html")

@app.route('/mug')
def mug():
    return render_template("mug.html")

@app.route('/shop')
def shop():
    return render_template("shop.html")


@app.route('/pong')
def pong():
    return render_template("pong.html")

@app.route('/pong2')
def pong2():
    return render_template("pong2.html")

if __name__ == "__main__":
    app.run()


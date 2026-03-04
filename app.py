from flask import Flask, render_template, redirect, session
import mysql.connector
from forms import RegisterForm, LoginForm, RedigerForm, SlettForm

app = Flask(__name__)
app.config["SECRET_KEY"] = "superhemmelig123"

def get_conn():
    return mysql.connector.connect(
        host="localhost",
        user="SigurdMelby",
        password="1234",
        database="Users"
    )

@app.route("/register", methods=["GET", "POST"])
def register():
    form = RegisterForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        age = form.age.data

        conn = get_conn()
        cur = conn.cursor()
        cur.execute("SELECT * FROM Users WHERE brukernavn = %s", (username,))
        user = cur.fetchone()
        if age < 13:
            form.age.errors.append("Du må være minst 13 år for å registrere deg")

        elif user:
            form.username.errors.append("Brukernavnet er allerede tatt")

        else:
            cur.execute(
                "INSERT INTO Users (brukernavn, passord, alder) VALUES (%s, %s,%s)",
                (username, password, age)
                )
            conn.commit()
            cur.close()
            conn.close()
            return redirect("/login")

    return render_template("register.html", form=form)

@app.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        conn = get_conn()
        cur = conn.cursor()
        cur.execute("SELECT brukernavn FROM Users WHERE brukernavn=%s AND passord=%s",(username, password,))
        user = cur.fetchone()
        cur.close()
        conn.close()
        

        if user:
            session['name'] = user[0]
            return redirect("/welcome")
        else:
            form.username.errors.append("Feil brukernavn eller passord")

    return render_template("login.html", form=form)

@app.route("/welcome")
def welcome():
    name = session.get('name')  # Hent navn fra session
    if not name:
        return redirect("/login")  # send tilbake til login om ikke logget inn
    return render_template("welcome.html", name=name)

@app.route("/rediger", methods=["GET", "POST"])
def rediger():
    name = session.get('name')
    form = RedigerForm()
    if form.validate_on_submit():
        username = form.username.data

        conn = get_conn()
        cur = conn.cursor()
        cur.execute("SELECT * FROM Users WHERE brukernavn = %s", (username,))
        user = cur.fetchone()

        if user:
            form.username.errors.append("Brukernavnet er allerede tatt")

        else:
            cur.execute("UPDATE Users SET brukernavn = %s WHERE brukernavn = %s", (username,name,))
            conn.commit()
            cur.close()
            conn.close()
            return redirect("/login")
    form2 = SlettForm()
    if form2.validate_on_submit():
        username = form2.username.data
        password = form2.password.data

        conn = get_conn()
        cur = conn.cursor()
        cur.execute("SELECT brukernavn FROM Users WHERE brukernavn=%s AND passord=%s", (username, password,))
        user = cur.fetchone()

        if user:
            cur.execute("DELETE FROM Users WHERE brukernavn=%s AND passord=%s", (name, password,))
            conn.commit()
            cur.close()
            conn.close()
            return redirect("/login")

        else:
           form2.username.errors.append("Brukernavnet eller passordet er feil")


    return render_template("rediger.html", form=form,form2=form2,name=name)

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

if __name__ == "__main__":
    app.run()


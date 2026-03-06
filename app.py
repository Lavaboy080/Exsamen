from flask import Flask, render_template, redirect, session,request
from werkzeug.security import generate_password_hash, check_password_hash
import mysql.connector
from forms import RegisterForm, LoginForm, RedigerForm, RedigerForm2, SlettForm

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
        passord_hash = generate_password_hash(password)

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
                "INSERT INTO Users (brukernavn, passord, alder, score, bestescore) VALUES (%s, %s,%s,0,0)",(username, passord_hash, age,))
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
        cur.execute("SELECT brukernavn, passord FROM Users WHERE brukernavn=%s",(username,))
        user = cur.fetchone()
        cur.close()
        conn.close()
        

        if user:
            password_db = user[1]
            if check_password_hash(password_db, password):
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
    if form.usrsubmit.data and form.validate():
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
            session["name"] = username
            return redirect("/login")
    #jeg måtte feilsøke med chat når jeg la inn form2
    form2 = RedigerForm2()
    if form2.passubmit.data and form2.validate():
        newpassword = form2.password.data
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("SELECT passord FROM Users WHERE brukernavn = %s", (name,))
        password_db = cur.fetchone()[0]

        if check_password_hash(password_db, newpassword):
            form2.password.errors.append("Dette er allerede ditt passord")
        else:
            newpassword_hash = generate_password_hash(newpassword)
            cur.execute(
                "UPDATE Users SET passord = %s WHERE brukernavn = %s",
                (newpassword_hash, name)
            )
            conn.commit()
            cur.close()
            conn.close()
            return redirect("/login")

    form3 = SlettForm()
    if form3.delsubmit.data and form3.validate():
        username = form3.delusername.data
        password = form3.delpassword.data
        
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("SELECT brukernavn, passord FROM Users WHERE brukernavn=%s", (username,))
        user = cur.fetchone()
        if username == name:
            if user:
                password_db = user[1]
                if check_password_hash(password_db, password):
                    cur.execute("DELETE FROM Users WHERE brukernavn=%s AND passord=%s", (username, password_db,))
                    conn.commit()
                    cur.close()
                    conn.close()
                    return redirect("/login")
                else:
                    form3.delusername.errors.append("Brukernavnet eller passordet er feil")
            else:
                form3.delusername.errors.append("Brukernavnet eller passordet er feil")
        else:
            form3.delusername.errors.append("Bruk ditt eget brukernavn")

    return render_template("rediger.html", form=form,form2=form2,form3=form3,name=name)

@app.route("/save_score", methods=["POST"])
def save_score():
    name = session.get('name')
    data = request.get_json()
    score = data.get("score")

    conn = get_conn()
    cur = conn.cursor()
    cur.execute("UPDATE Users SET score = %s WHERE brukernavn = %s", (score, name,))
    conn.commit()
    cur.close()
    conn.close()

    conn = get_conn()
    cur = conn.cursor()
    cur.execute("SELECT bestescore FROM Users WHERE brukernavn=%s", (name,))
    highscore = cur.fetchone()[0]

    if score > highscore:
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("UPDATE Users SET bestescore = %s WHERE brukernavn = %s", (score, name,))
        conn.commit()
        cur.close()
        conn.close()

    return {"status": "success"}

@app.route('/scores')
def scores():
    conn = get_conn()
    cur = conn.cursor(dictionary=True)
    cur.execute("SELECT brukernavn, bestescore FROM Users ORDER BY bestescore DESC LIMIT 10")
    players = cur.fetchall()
    cur.close()
    conn.close()
    
    return render_template("scores.html", players=players)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/mug')
def mug():
    name = session.get('name')
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("SELECT score FROM Users WHERE brukernavn = %s", (name,))
    result = cur.fetchone()

    cur.close()
    conn.close()

    score = result[0] if result and result[0] else 0

    return render_template("mug.html",name=name,score=score)

@app.route('/shop')
def shop():
    return render_template("shop.html")


@app.route('/pong')
def pong():
    return render_template("pong.html")

if __name__ == "__main__":
    app.run()


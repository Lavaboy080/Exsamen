from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, IntegerField
from wtforms.validators import InputRequired

class RegisterForm(FlaskForm):
    username = StringField("Brukernavn", validators=[InputRequired()])
    password = PasswordField("Passord", validators=[InputRequired()])
    age = IntegerField("Age",validators=[InputRequired()])
    submit = SubmitField("Registrer")

class LoginForm(FlaskForm):
    username = StringField("Brukernavn", validators=[InputRequired()])
    password = PasswordField("Passord", validators=[InputRequired()])
    submit = SubmitField("Logg inn")

class RedigerForm(FlaskForm):
    username = StringField("Brukernavn", validators=[InputRequired()])
    usrsubmit = SubmitField("Endre")

#lager en form for endring av passord
class RedigerForm2(FlaskForm):
    password = PasswordField("Passord", validators=[InputRequired()])
    passubmit = SubmitField("Endre")



class SlettForm(FlaskForm):
    delusername = StringField("Brukernavn", validators=[InputRequired()])
    delpassword = PasswordField("Passord", validators=[InputRequired()])
    delsubmit = SubmitField("Slett bruker")


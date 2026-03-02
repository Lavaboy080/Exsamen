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
    submit = SubmitField("Registrer")

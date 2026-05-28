# Proskjekt

Dette er en readme for en nettside med en hjemside som leder til forskjellige spill laget primert med **Javascript**.  
Denne nettsiden inneholder variasjoner av cookie cliker, breakout og snake. Nettsiden inneholder også brukerlogin, brukertilpasning og score.

---

## Universelt for alle nettsider (bortsett fra login og registrer)
- Styling med Css.
- Tabbingfunksjon som gjør det mulig og tabbe gjennom siden.
- Litt info om siden du er på.
- Navigasjonsbar som får deg til å bytte sider.

## Cookie cliker nettsiden inneholder
- En rød firkant man kan klikke for å øke score.
- En save knapp for å lagre scoren.
- En reset knapp for å sette score til 0.
- To butikknapper som ikke er programert ferdig.

---

## Breakout nettsiden inneholder
- En ball som flytter seg rund og spretter fra vegger.
- En platform som reagerer med ballen og flyttes rundt av spilleren.
- Blocker som forsvinner når du treffer dem med ballen.
- En score som opdateres for hver gang du har ødelagt en blokk.
- Game over window når ballen treffer gulvet.
- Foxy jumpscare når du vinner.

## Snake nettdiden inneholder
- En start/restart knapp for å starte og restarte spillet.
- En slange du kan snu retning på.
- En box slangen er inni.
- Game over tekst hvis slagen krasjer i boksen
- Score system

---

## Kontroller
- **A eller piltast høyre/ ←** – venstre  
- **D eller piltast venstre / →** – høyre  


---

## Teknisk
- Javascript
- Python
- CSS
- Html
- MySql
- JSON


---
## Krav
En ferdig opsettet virtual konteiner med proxmox
Ferdig lastet ned mysql på serveren
Ferdig inatlert git
Ferdig instalert pip
Ferdig instalert python3


## Hvordan kjøre
Guide
åpne terminalen og logg in på din virtual container

logg inn på mysql med sudobrukeren

kjør: create database Users;


kjør: create table Users ( id int autoincrement primary key, brukenavn text, passord text, alder int, score int, bestescore int );


kjør: git clone https://github.com/Lavaboy080/Exsamen.git
kloner alee filene til prosjektet inn på maskinen din

kjør: cd Exsamen
flytter deg inn i mappen

kjør: pip install -r requirements.txt
instalerer ting fra pakker som jobber med python (du trenger det for at koden skal kjøre)

kjør: ip a 
dette gir deg info om ip adressen om srveren din som lar deg kjøre nettsiden

kopier hele greie og spør google rund om hav som er ip adressen 


kjør: sudo touch app.wsgi 

sett in ip adressen i browserennog og søk 
ferdig




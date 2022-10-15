import sqlite3 as sl
import hashlib
con = sl.connect('database.db',check_same_thread=False)
cur=con.cursor()

# with con:
cur.execute("""CREATE TABLE IF NOT EXISTS users(name TEXT UNIQUE, pinHash TEXT ,secret TEXT);""")

def create_user(name:str, pin:str,secret:str):
    digest = hashlib.sha512(pin.encode()).hexdigest()
    cur=con.cursor()
    try:
        cur.execute("INSERT INTO users VALUES(?,?,?);", (name, digest,secret))
        con.commit()

#Closing the connection
        
    except:
        print("user already exists")

def get_user(name: str, pin:str):
    digest = hashlib.sha512(pin.encode()).hexdigest()
    cur=con.cursor()
    cur.execute("SELECT * FROM users WHERE name= ?;", (name,))
    y=cur.fetchone()
    print(y)
    user_data=('a','a','a')

    for row in cur:
        print(row)
        user_data = row
        
        print(user_data)
        break

    (name, pinHash, secret) = y
    print(name)
    print(secret)
    print(pinHash)
    if (pinHash == digest):
        return {
            "name": name,
            "secret": secret,
            "pinHash": pinHash
        }
    else:
        raise Exception("Wrong pin or user not found")


def update_secret(user,newSecret:str):
    cur=con.cursor()
    cur.execute("""UPDATE users SET secret=? WHERE name=?;""", (newSecret,user["name"]))
    con.commit()

#Closing the connection
    
create_user("Rupin", "123456","This is my secret")
get_user("Rupin", "123456")
# get_user("Rupin", "211200")
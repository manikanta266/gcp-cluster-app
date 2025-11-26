from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import os

app = Flask(__name__)
CORS(app)

#m
def get_db():
    host = os.getenv("DB_HOST")
    user = os.getenv("DB_USER")
    password = os.getenv("DB_PASS")
    database = os.getenv("DB_NAME")

    print(host, user, database)  # debug

    return mysql.connector.connect(
        host=host,
        user=user,
        password=password,
        database=database
    )

# # DB connection
# def get_db():
#       return mysql.connector.connect(
#         host=os.getenv("DB_HOST"),
#         user=os.getenv("DB_USER"),
#         password=os.getenv("DB_PASS"),
#         database=os.getenv("DB_NAME")
#     )

    # return mysql.connector.connect(
    #     host="34.41.89.193",
    #     user="first",
    #     password="Mani@123",
    #     database="first-database"
    # )

@app.route("/users", methods=["GET"])
def get_users():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users")
    result = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify(result)

@app.route("/users", methods=["POST"])
def add_user():
    data = request.json
    db = get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO users (name, email) VALUES (%s, %s)", 
                   (data['name'], data['email']))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({"message": "User added!"})

@app.route("/users/<id>", methods=["GET"])
def get_user(id):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE id=%s", (id,))
    result = cursor.fetchone()
    cursor.close()
    db.close()
    return jsonify(result)

@app.route("/users/<id>", methods=["PUT"])
def update_user(id):
    data = request.json
    db = get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE users SET name=%s, email=%s WHERE id=%s",
                   (data['name'], data['email'], id))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({"message": "Updated"})

@app.route("/users/<id>", methods=["DELETE"])
def delete_user(id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM users WHERE id=%s", (id,))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({"message": "Deleted"})


# if __name__ == "__main__":
#     app.run(host="0.0.0.0",port=5000, debug=True)

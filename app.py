from flask import Flask, render_template, jsonify, request, redirect,url_for



DEBUG = False

app = Flask(__name__)


@app.route("/")
def new_session():
    return render_template('main.html')




if __name__ == '__main__':
    app.run(debug=DEBUG)

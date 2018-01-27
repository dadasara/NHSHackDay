from flask import Flask, render_template, redirect

app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('/index.html', title="Test")

@app.route('/index')
def redirect_main_page():
    return redirect("/")

if __name__ == '__main__':
    app.debug = True
    app.run(host="0.0.0.0")

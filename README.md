# Prototype for CSE870 Group D, Spring 2023

Repo which houses the source code for the protytpe for the Group D mini-project 
submission.

## Getting Started
This project was written in Python 3.9 and assumes that you have it already 
installed. Other versions of python may still work, but are not tested or supported.

1. First clone the repo and then navigate into it's root directory.
```sh
git clone your_prefered_clone_method
cd cse870_prototype/
```
2. Setup and activate your virtual environment. Please call your virual environment `venv` so that 
the `.gitignore` file knows to ignore it. If you decide to use a different name then you will need 
to update the `.gitignore` file yourself. The commands below assume you are naming it `venv`.
```sh
python3 -m venv venv
source venv/bin/activate
```
3. Install Flask and other requirements from the `requirements.txt` file. **Remember to update this 
file if you add any new project requirements!** When the application is deployed it will rely on 
this file to install libraries. 
```sh
pip install -r requirements.txt
```
3. Start the application 
```sh
python3 app.py
```
3. Access the webserver by going to the specified page. When you start the server 
you should see something like the following. This text indicates that you can access
the application by going to `http://127.0.0.1:5000`. For various reasons your 
computer may guide you to a different page.
```sh
 * Serving Flask app 'app'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 194-563-195
```
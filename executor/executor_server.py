import json
from flask import Flask
from flask import request
import executor_utils as eu

app = Flask(__name__)

@app.route('/')
def hello():
    return 'OMG It works!'

@app.route('/build_and_run', methods=['POST'])
def build_and_run():
    data = json.loads(request.data)

    if 'code' not in data or 'lang' not in data:
        return 'You should provide both "code" and "lang"'
    code = data['code']
    lang = data['lang']

    print("API got called with code: %s in %s" % (code, lang))
    result = eu.build_and_run(code, lang)
    print(result)
    return str(result)

if __name__ == "__main__":
    eu.load_image()
    app.run(debug=True)

from flask import Flask, request
from flask_cors import CORS, cross_origin
import scraper
import json

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "content-Type"


@app.route('/')
def default():
    online = {"Status": "Online"}
    return json.dumps(online)


@app.route('/scrape', methods=['POST'])
@cross_origin()
def get_product_details():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        body = request.json
        results = scraper.scrape(body["URL"])
        # Just incase Amazon blocks you from scraping you can use this 1 items
        # results = {
        # "Name": "Kingston 480GB A400 SATA 3 2.5 inch Internal SSD SA400S37/480G - HDD Replacement for Increase Performance",
        # "Price": "$37.00",
        # "Rating": "4.7 out of 5 stars",
        # "ReviewCount": "181441 ratings",
        # "Availability": "In Stock"
        # }  
        return results
    else:
        return 'Content-Type not supported!'
    

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0",)
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pymongo import MongoClient
import config
import requests
import time

# Connect to the database and get the right table


def get_database():

    CONNECTION_STRING = config.dbURL

    client = MongoClient(CONNECTION_STRING)

    return client['Scraper']


def check(item):
    body = {"URL": item['url']}
    scraperUrl = "http://localhost:5000/scrape"

    post_response = requests.post(scraperUrl, json=body)
    post_response_json = post_response.json()
    temp = post_response_json['Price']
    price = float(temp[1:])

    if float(item['originalPrice']) > price and float(item['newPrice']) != price:

        return price
    elif float(item['originalPrice']) > price and float(item['newPrice']) == price:
        
        return 0
    else:
        
        return 0


def sendEmail(item):
    sender_email = config.email
    receiver_email = item['email']
    password = config.emailPW

    url = item['url']
    newPrice = item['newPrice']
    name = item['itemName']
    oldPrice = item['originalPrice']

    message = MIMEMultipart("alternative")
    message["Subject"] = "DISCOUNTS CHECK"
    message["From"] = sender_email
    message["To"] = receiver_email

    # Create the plain-text and HTML version of your message
    text = """\
    SALE:
    Check out the big discount on your added item.
    Items: {sendName}
    URL: {sendurl}
    Current Price: {sendNewPrice}
    Original Price: {sendOldPrice}
    """   .format(sendName=name, sendurl=url, sendNewPrice=newPrice, sendOldPrice=oldPrice)

    html = """\
    <html>
        <body>
        <p>SALE:<br>
                Check out the big discount on your added item.<br>
        </p>
        <div> 
            Items: "{sendName}": "{sendurl}"<br>
            URL: "{sendurl}"<br>
            Current Price: "{sendNewPrice}"<br>
            Original Price: "{sendOldPrice}"<br>
        </div>
        </body>
    </html>
    """   .format(sendName=name, sendurl=url, sendNewPrice=newPrice, sendOldPrice=oldPrice)

    # Turn these into plain/html MIMEText objects
    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")

    # Add HTML/plain-text parts to MIMEMultipart message
    # The email client will try to render the last part first
    message.attach(part1)
    message.attach(part2)

    # Create secure connection with server and send email
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(
            sender_email, receiver_email, message.as_string()
        )


if __name__ == "__main__":
    while True:
        dbname = get_database()
        items = dbname.items
        for item in items.find():
            newPrice = check(item)
            if newPrice != 0:
                # add function call for sending emails here
                sendEmail(item)

                print('Add and Email')
                item['newPrice'] = newPrice
                items.update_one({'_id': item['_id']}, {
                                "$set": item}, upsert=False)

            else:
                print('No Change')
    time.sleep(21600)

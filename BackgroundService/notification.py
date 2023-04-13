import schedule
import time as tm
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pymongo import MongoClient

connection_string = "mongodb+srv://scraper:newpassword@cluster0.6bx67x8.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(connection_string)

# Database Name
db = client["Scraper"]

# Collection Name
col = db["items"]

x = col.find({}, {
    '_id': 0,
    'itemName': 1,
    'originalPrice': 1,
    'newPrice': 1,
    'rating': 1,
    'reviewTotal': 1,
    'availability': 1,
    'url': 1,
    'email': 1
})

for data in x:
    print(data)


# def job():
#     sender_email = "gooddeals8998@gmail.com"
#     receiver_email = "letra1712@gmail.com"
#     password = "ikovsnbkhaufjjpf"

#     message = MIMEMultipart("alternative")
#     message["Subject"] = "DISCOUNTS CHECK"
#     message["From"] = sender_email
#     message["To"] = receiver_email

#     # Create the plain-text and HTML version of your message
#     text = """\
#   SALE:
#   Check out the big discount on your added item."""
#     html = """\
#   <html>
#     <body>
#       <p>SALE:<br>
#         Check out the big discount on your added item.<br>
#         <a href="http://www.google.com">Item</a>
#       </p>
#     </body>
#   </html>
#   """

#     # Turn these into plain/html MIMEText objects
#     part1 = MIMEText(text, "plain")
#     part2 = MIMEText(html, "html")

#     # Add HTML/plain-text parts to MIMEMultipart message
#     # The email client will try to render the last part first
#     message.attach(part1)
#     message.attach(part2)

#     # Create secure connection with server and send email
#     context = ssl.create_default_context()
#     with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
#         server.login(sender_email, password)
#         server.sendmail(
#             sender_email, receiver_email, message.as_string()
#         )


# schedule.every(5).seconds.do(job)

# while True:
#     schedule.run_pending()
#     tm.sleep(1)

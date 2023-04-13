from pymongo import MongoClient
import config
import requests
import time

#Connect to the database and get the right table
def get_database():
 
   CONNECTION_STRING = config.dbURL
 
   client = MongoClient(CONNECTION_STRING)
 
   return client['itemsDb']


def check(item):
    body = {"URL":item['url']}
    scraperUrl = "http://localhost:5000/scrape"

    post_response = requests.post(scraperUrl, json=body)
    post_response_json = post_response.json()
    temp = post_response_json['Price']
    price = float(temp[1:])
    # print('Original Price is: ' + "%.2f" % float(item['originalPrice']))
    # print('Scraper Price is: ' + "%.2f" % price)
   
    if float(item['originalPrice']) > price and float(item['newPrice']) != price:
        # print('Update Db and send Email')
        # print('Price is lower but db isnt updated and email not sent yet')
        return price
    elif float(item['originalPrice']) > price and float(item['newPrice']) == price:
        # print('Already Updateed Db and sent Email')
        return 0
    else:
        # print('No Change')
        return 0
    


if __name__ == "__main__":  
    while True:
        dbname = get_database()
        items = dbname.items
        for item in items.find():
            newPrice = check(item)
            if newPrice != 0:
                print('Add and Email')
                item['newPrice'] = newPrice
                items.update_one({'_id':item['_id']}, {"$set": item}, upsert=False)

                #add function call for sending emails here

            else:
                print('No Change')
        time.sleep(21600)
from bs4 import BeautifulSoup
import requests
import json
 
def scrape(URL):
    # Dict for storing product details
    product = {
        "Name": "",
        "Price": 0,
        "Rating": "",
        "ReviewCount": "",
        "Availability": ""
    }
 
    # specifying user agent, You can use other user agents
    # available on the internet
    HEADERS = ({'User-Agent':'Mozilla/5.0 (X11; Linux x86_64)AppleWebKit/537.36 (KHTML, like Gecko)Chrome/44.0.2403.157 Safari/537.36',
                                'Accept-Language': 'en-US, en;q=0.5'})
 
    # Making the HTTP Request
    webpage = requests.get(URL, headers=HEADERS)
 
    # Creating the Soup Object containing all data
    soup = BeautifulSoup(webpage.content, "lxml")
 
    # retrieving product title
    try:
        # Outer Tag Object
        title = soup.find("span",
                          attrs={"id": 'productTitle'})
 
        # Inner NavigableString Object
        title_value = title.string
 
        # Title as a string value
        title_string = title_value.strip().replace(',', '')
 
    except AttributeError:
        title_string = "NA"
 
    # saving the Name in the dict
    product["Name"] = title_string
    
 
   # Retreivng Price
    try:
        price = soup.find("span", class_="a-offscreen").text
        
    except AttributeError:
        try:
            price = soup.find("span", attrs={"id": 'sns-base-price'}).text
            if price.find('\n') != -1:
                priceSplit = price.split('\n')
                price = priceSplit[0].strip()
            # we are omitting unnecessary spaces
            # and commas form our string   
        except AttributeError:
            price = "NA"
 
    # saving price to dict
    product["Price"] = price
    
 
    # retrieving product rating
    try:
        rating = soup.find("i", attrs={'class': 'a-icon a-icon-star a-star-4-5'}).string.strip().replace(',', '')
 
    except AttributeError:
 
        try:
            rating = soup.find(
                "span", attrs={'class': 'a-icon-alt'}).string.strip().replace(',', '')
        except:
            rating = "NA"
 
    # Saving ratings to dict
    product["Rating"] = rating
    
 
    try:
        review_count = soup.find(
            "span", attrs={'id': 'acrCustomerReviewText'}).string.strip().replace(',', '')
 
    except AttributeError:
        review_count = "NA"

    # Save ReviewCount to dict
    product["ReviewCount"] = review_count
    


    try:
        available = soup.find("div", attrs={'id': 'availability'})
        available = available.find("span").string.strip().replace(',', '')
 
    except AttributeError:
        available = "NA"
 
    # Saving the availability
    product["Availability"] = available
    
 
    # Return the product as a JSON object
    return json.dumps(product)
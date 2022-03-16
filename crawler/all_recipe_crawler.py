from bs4 import BeautifulSoup

import urllib.parse
import urllib.request

import re


class AllRecipes:
    def search(query_dict):
        """
        Search recipes parsing the returned html data.

        URL SAMPLE:
        https://www.allrecipes.com/search/results/?IngIncl=cocoa&search=brownies
        """
        base_url = "https://allrecipes.com/search/results/?"
        query_url = urllib.parse.urlencode(query_dict)
        print(query_url)
        url = base_url + query_url
        print(url)
        req = urllib.request.Request(url)
        req.add_header('Cookie', 'euConsent=true')

        html_content = urllib.request.urlopen(req).read()

        soup = BeautifulSoup(html_content, 'html.parser')
        #soup.select("div", {"class":"card__detailsContainer-left"})
        search_data = []
        articles = soup.findAll("div", {"class":"card__detailsContainer-left"})

        print(articles)

        for article in articles:
            data = {}
            try:
                data["name"] = article.find("h3", {"class": "card__title elementFont__resetHeading"}).get_text().strip(' \t\n\r')
                data["description"] = article.find("div", {"class": "card__summary"}).get_text().strip(' \t\n\r')
                data["url"] = article.find("a.card__titleLink", href=re.compile('^https://www.allrecipes.com/recipe/'))['href']
                try:
                    data["image"] = article.find("a", href=re.compile('^https://www.allrecipes.com/recipe/')).find("img")["data-original-src"]
                except Exception as e1:
                    pass
                try:
                    data["rating"] = float(article.find("div", {"class": "card__ratingContainer"}).find("span")["data-ratingstars"])
                except ValueError:
                    data["rating"] = None
            except Exception as e2:
                pass
            if data and "image" in data:  # Do not include if no image -> its probably an add or something you do not want in your result
                search_data.append(data)

        return search_data

    def get(url):
        """
        'url' from 'search' method.
            ex. "/recipe/106349/beef-and-spinach-curry/"
        """
        #base_url = "https://allrecipes.com/"
        #url = base_url + uri

        req = urllib.request.Request(url)
        req.add_header('Cookie', 'euConsent=true')

        html_content = urllib.request.urlopen(req).read()
        soup = BeautifulSoup(html_content, 'html.parser')

        try:
            rating = float(soup.find("div", {"class": "rating-stars"})["data-ratingstars"])
        except ValueError:
            rating = None
        ingredients = soup.findAll("li", {"class": "checkList__line"})
        steps = soup.findAll("span", {"class": "recipe-directions__list--item"})
        name = soup.find("h1", {"class": "recipe-summary__h1"}).get_text().replace("®", "")

        direction_data = soup.find("div", {"class": "directions--section__steps"})
        prep_time = direction_data.find("time", {"itemprop": "prepTime"}).get_text()
        cook_time = direction_data.find("time", {"itemprop": "cookTime"}).get_text()
        total_time = direction_data.find("time", {"itemprop": "totalTime"}).get_text()

        data = {
                "rating": rating,
                "ingredients": [],
                "steps": [],
                "name": name,
                "prep_time": prep_time,
                "cook_time": cook_time,
                "total_time": total_time
                }

        for ingredient in ingredients:
            str_ing = ingredient.find("span", {"class": "recipe-ingred_txt"}).get_text()
            if str_ing and str_ing != "Add all ingredients to list":
                data["ingredients"].append(str_ing)

        for step in steps:
            str_step = step.get_text()
            if str_step:
                data["steps"].append(str_step)

        return data



if __name__ == "__main__":
    query_options = {
    "wt": "pork curry",         # Query keywords
    "ingIncl": "olives",        # 'Must be included' ingrdients (optional)
    "ingExcl": "onions salad",  # 'Must not be included' ingredients (optional)
    "sort": "re"                # Sorting options : 're' for relevance, 'ra' for rating, 'p' for popular (optional)
    }

    search_results = AllRecipes.search(query_options)
    print(search_results)
from flask import Flask, request, jsonify
from flask_cors import CORS
from ksl_cars import ksl_cars_search, get_makes_models_trims, semicolonize

app = Flask(__name__)
CORS(app)


@app.route("/api/", methods=["GET"])
def search_vehicles():
    keyword = request.args.get("keyword", None)
    page = int(request.args.get("page", 1))

    filters = {}
    for filter_name in [
        "sellerType",
        "newUsed",
        "make",
        "model",
        "priceTo",
        "priceFrom",
        "mileageFrom",
        "mileageTo",
        "yearFrom",
        "yearTo",
        "trim",
        "transmission",
        "fuel",
        "drive",
        "titleType",
    ]:
        filter_value = request.args.get(filter_name, None)
        if filter_value:
            filters[filter_name] = filter_value
    print(filters)

    listings = ksl_cars_search(keyword=keyword, filters=filters, page=page)
    if "error" in listings:
        return jsonify({"error": listings["error"]})
    listings_list = list(listings.values())

    # Remove the $ sign from the price field for each vehicle
    for vehicle in listings_list:
        if vehicle.get("price") and vehicle["price"].startswith("$"):
            vehicle["price"] = vehicle["price"][1:]

    return jsonify(listings_list)


@app.route("/api/makes-models-trims/", methods=["GET"])
def get_makes_models_trims_route():
    make = request.args.get("make", None)
    model = request.args.get("model", None)
    data = get_makes_models_trims(make=make, model=model)
    return jsonify(data)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4000)

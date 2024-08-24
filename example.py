# Example code
import pandas as pd
from ksl_cars_api import ksl_cars_search, VehicleSearchFilters


def main():
    my_filters = VehicleSearchFilters(
        transmission="Manual",
        priceTo=4000,
        sort=2,  # Price Low to High
    )

    listing_dicts = []
    for listing in ksl_cars_search(filters=my_filters, pages_limit=5):
        print(listing.to_dict())
        listing_dicts.append(listing.to_dict())

    df = pd.DataFrame(listing_dicts)
    # Replace NaNs with "Not Specified"
    df.fillna("Not Specified", inplace=True)

    # show all columns when printing
    pd.set_option("display.max_columns", None)
    pd.set_option("display.max_rows", None)
    pd.set_option("display.expand_frame_repr", False)

    columns_to_use = [
        "newUsed",
        "listing_title",
        "trim",
        "price",
        "url",
        "time_created_utc",
        "paint",
        "mileage",
        "transmission",
        "titleType",
        "sellerType",
    ]

    print(df[columns_to_use])


if __name__ == "__main__":
    main()

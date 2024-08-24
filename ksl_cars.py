import time
from dataclasses import dataclass

import requests
from typing import Literal, List, get_type_hints, Union, get_origin, get_args
from datetime import datetime

# Seconds to wait between requests to avoid getting blocked
SLEEP_TIME = 2

SellerType = Literal["For Sale By Owner", "Dealership"]
NewUsedType = Literal["Used", "New", "Certified", "Sold"]
TransmissionType = Literal["Automatic", "Manual", "CVT", "Automanual"]
FuelType = Literal[
    "Compressed Natural Gas", "Diesel", "Electric", "Flex Fuel", "Gasoline", "Hybrid"
]
DriveType = Literal["2-Wheel Drive", "4-Wheel Drive", "AWD", "FWD", "RWD"]
TitleType = Literal[
    "Clean Title",
    "Dismantled Title",
    "Not Specified",
    "Rebuilt/Reconstructed Title",
    "Salvage Title",
]
NumberOfSeatsType = Literal[1, 2, 3, 4, 5, 6, 7, 8, 9]
CabSizeType = Literal["Crew Cab", "Extended Cab", "Regular Cab"]
CylindersType = Literal[2, 3, 4, 5, 6, 8, 10, 12]
NumberOfDoorsType = Literal[1, 2, 3, 4, 5]
BedSizeType = Literal["Longbed", "Shortbed", "Standard Longbed", "Standard Shortbed"]
BodyType = Literal[
    "Compact",
    "Convertible",
    "Coupe",
    "Hatchback",
    "Sedan",
    "SUV",
    "Truck",
    "Van",
    "Wagon",
    "Minivan",
    "Crossover",
    "Industrial / Semi",
]
ColorType = Literal[
    "Beige",
    "Black",
    "Blue",
    "Bronze",
    "Brown",
    "Creme",
    "Gold",
    "Gray",
    "Green",
    "Orange",
    "Other",
    "Pink",
    "Purple",
    "Red",
    "Silver",
    "Tan",
    "White",
    "Yellow",
]
ConditionType = Literal["Poor", "Fair", "Good", "Very Good", "Excellent"]

"""
Sort types:
0 = Newest to Oldest
1 = Oldest to Newest
2 = Price Low to High
3 = Price High to Low
4 = Newest to Oldest Model Year
5 = Oldest to Newest Model Year
6 = Mileage Low to High
7 = Mileage High to Low
"""
SortType = Literal[0, 1, 2, 3, 4, 5, 6, 7]


@dataclass
class VehicleSearchFilters:
    sellerType: SellerType = None
    newUsed: List[NewUsedType] | NewUsedType = None
    make: str | List[str] = None
    model: str | List[str] = None
    priceTo: int = None
    priceFrom: int = None
    mileageFrom: int = None
    mileageTo: int = None
    trim: str | List[str] = None
    transmission: List[TransmissionType] | TransmissionType = None
    keyword: str = None
    fuel: List[FuelType] | FuelType = None
    drive: List[DriveType] | DriveType = None
    titleType: List[TitleType] | TitleType = None
    numberOfSeats: List[NumberOfSeatsType] | NumberOfSeatsType = None
    carfaxAvailable: bool | Literal["0"] | Literal["1"] = None
    hasPhotos: bool | Literal["Has Photos"] = None
    cabSize: List[CabSizeType] | CabSizeType = None
    cylinders: List[CylindersType] | CylindersType = None
    numberDoors: List[NumberOfDoorsType] | NumberOfDoorsType = None
    bedSize: List[BedSizeType] | BedSizeType = None
    body: List[BodyType] | BodyType = None
    paint: List[ColorType] | ColorType = None
    upholstery: List[ColorType] | ColorType = None
    interiorCondition: List[ConditionType] | ConditionType = None
    exteriorCondition: List[ConditionType] | ConditionType = None
    liter: str | List[str] = None  # 1.0L, 1.1L, 1.2L, etc.
    sort: SortType = None

    def __post_init__(self):
        self._validate_attributes()

    def _validate_attributes(self):
        type_hints = get_type_hints(self)
        for attr, attr_type in type_hints.items():
            value = getattr(self, attr)
            if value is not None and not self._is_valid_type(value, attr_type):
                raise TypeError(
                    f"Invalid type for {attr}: Expected {attr_type}, got {type(value)}"
                )

    def _is_valid_type(self, value, expected_type):
        origin = get_origin(expected_type)
        args = get_args(expected_type)

        if origin is Union:
            return any(self._is_valid_type(value, arg) for arg in args)

        if origin is list:
            if not isinstance(value, list):
                return False
            return all(self._is_valid_type(item, args[0]) for item in value)

        if origin is Literal:
            return value in args

        if isinstance(expected_type, type):
            return isinstance(value, expected_type)

        return False

    def __setattr__(self, key, value):
        type_hints = get_type_hints(self)
        if key in type_hints:
            expected_type = type_hints[key]
            if value is not None and not self._is_valid_type(value, expected_type):
                raise TypeError(
                    f"Invalid type for {key}: Expected {expected_type}, got {type(value)}"
                )
        super().__setattr__(key, value)

    def to_list(self) -> list[str]:
        if type(self.carfaxAvailable) is bool:
            self.carfaxAvailable = "1" if self.carfaxAvailable else "0"
        if type(self.hasPhotos) is bool:
            self.hasPhotos = "Has Photos" if self.hasPhotos else None
        filter_list = []
        for key, value in vars(self).items():
            if value:
                filter_list.extend([str(key), semicolonize(value)])
        return filter_list

    def __str__(self):
        attributes = vars(self)
        # remove None values
        attributes = {k: v for k, v in attributes.items() if v is not None}
        return str(attributes)


@dataclass
class VehicleListing:
    listing_title: str
    year: int
    make: str
    model: str
    unix_timestamp: int
    price: int
    url: str

    def __init__(self, listing_json: dict):
        for key, value in listing_json.items():
            # convert values to best type
            setattr(self, key, value)

        self.url = f"https://cars.ksl.com/listing/{listing_json['id']}"

        self.year = int(listing_json["makeYear"])
        delattr(self, "makeYear")

        self.price = int(self.price)
        self.listing_title = f"{self.year} {self.make} {self.model}"
        self.unix_timestamp = int(listing_json["displayTime"])

        delattr(self, "displayTime")
        self.time_created_utc = datetime.utcfromtimestamp(self.unix_timestamp).strftime(
            "%Y-%m-%d %H:%M:%S"
        )

    def to_dict(self) -> dict:
        return dict(vars(self))


class APIHandler:
    def __init__(self):
        self.api_url = "https://cars.ksl.com/nextjs-api/proxy"
        self.headers = {
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:129.0) Gecko/20100101 Firefox/129.0",
        }

    def post(
        self,
        endpoint: str,
        post_data: dict = None,
        max_retries: int = 5,
        retries: int = 0,
    ) -> dict:
        data = {"endpoint": endpoint}
        if post_data:
            data["options"] = post_data

        page = requests.post(self.api_url, headers=self.headers, json=data)

        if page.status_code == 503:
            if retries == max_retries:
                raise ValueError("HTTP 503 error. Max retries reached")

            print(f"HTTP 503 error. Retry {retries + 1}/{max_retries}")
            # Retry
            time.sleep(SLEEP_TIME)
            return self.post(
                endpoint, post_data, max_retries=max_retries, retries=retries + 1
            )

        if page.status_code != 200:
            raise ValueError(f"HTTP error {page.status_code}: {page.text}")

        return page.json()["data"]


def semicolonize(input_list: list | str) -> str:
    """
    Joins lists with semicolons which is what the API requires for multiple parameters
    """
    if type(input_list) is not list:
        return str(input_list)
    return ";".join(input_list)


def get_makes_models_trims(make: str = None, model: str = None) -> list:
    """
    Function to return all available makes, models, and trims
    """
    api = APIHandler()
    cars = api.post("/classifieds/cars/category/getTrimsForMakeModel")

    # return models if make defined
    if make and not model:
        models = [model for model in cars[make]]
        return models

    # return trims if make and model defined
    if make and model:
        trims = [trim for trim in cars[make][model]]
        return trims

    # return all makes if nothing defined
    makes = [make for make in cars]
    return makes


def ksl_cars_search(
    keyword: str = None,
    filters: VehicleSearchFilters = None,
    start_page: int = 1,
    pages_limit: int = 1,
) -> VehicleListing:
    """
    Generator function that yields car listings per given keyword/filters across multiple pages.
    """
    if filters is None:
        filters = VehicleSearchFilters()
    if keyword:
        filters.keyword = keyword

    # If all filters are None, return error
    if not any(vars(filters).values()):
        raise ValueError("No filters or keyword provided")

    filter_array = filters.to_list()

    api = APIHandler()
    page = start_page

    while True:
        data = {"body": ["page", f"{page}"]}
        data["body"].extend(filter_array)

        print(f"Requesting page {page} with filters: {filters}")
        response = api.post("/classifieds/cars/search/searchByUrlParams", data)

        raw_listings = response.get("items", [])
        if not raw_listings:
            break  # Stop iteration if no more listings are found

        for listing in raw_listings:
            yield VehicleListing(listing)

        if page >= pages_limit:
            break

        page += 1  # Move to the next page
        time.sleep(SLEEP_TIME)

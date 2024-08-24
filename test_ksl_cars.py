import unittest
from unittest.mock import patch

import ksl_cars
from ksl_cars import (
    VehicleSearchFilters,
    VehicleListing,
    APIHandler,
    semicolonize,
    ksl_cars_search,
    get_makes_models_trims,
)

ksl_cars.SLEEP_TIME = 0


class TestGetMakesModelsTrims(unittest.TestCase):
    def test_get_makes_models_trims(self):
        cars = {
            "Toyota": {"Corolla": ["LE"]},
            "Honda": {"Civic": ["Si"]},
            "Ford": {"F-150": ["Lariat"]},
        }

        # Patch the APIHandler.post method at the class level
        with patch.object(APIHandler, "post") as mock_post:
            mock_post.return_value = cars
            self.assertEqual(get_makes_models_trims(), ["Toyota", "Honda", "Ford"])
            self.assertEqual(get_makes_models_trims(make="Toyota"), ["Corolla"])
            self.assertEqual(
                get_makes_models_trims(make="Toyota", model="Corolla"), ["LE"]
            )


class TestVehicleSearchFilters(unittest.TestCase):
    def test_valid_initialization(self):
        filters = VehicleSearchFilters(sellerType="Dealership", priceTo=10000)
        self.assertEqual(filters.sellerType, "Dealership")
        self.assertEqual(filters.priceTo, 10000)

    def test_invalid_initialization(self):
        with self.assertRaises(TypeError):
            VehicleSearchFilters(sellerType="Invalid Seller")

    def test_set_invalid_attribute_type(self):
        filters = VehicleSearchFilters()

        with self.assertRaises(TypeError):
            filters.priceTo = "Invalid Value"

    def test_to_list(self):
        filters = VehicleSearchFilters(priceTo=10000, transmission="Manual")
        expected = ["priceTo", "10000", "transmission", "Manual"]
        self.assertEqual(filters.to_list(), expected)

    def test_semicolonize(self):
        self.assertEqual(semicolonize(["A", "B", "C"]), "A;B;C")
        self.assertEqual(semicolonize("A"), "A")


class TestVehicleListing(unittest.TestCase):
    def test_initialization(self):
        listing_json = {
            "id": "12345",
            "makeYear": "2010",
            "price": "8000",
            "make": "Toyota",
            "model": "Corolla",
            "displayTime": "1638467200",
        }
        listing = VehicleListing(listing_json)
        self.assertEqual(listing.listing_title, "2010 Toyota Corolla")
        self.assertEqual(listing.year, 2010)
        self.assertEqual(listing.price, 8000)
        self.assertEqual(listing.url, "https://cars.ksl.com/listing/12345")


class TestAPIHandler(unittest.TestCase):
    @patch("requests.post")
    def test_post_success(self, mock_post):
        mock_post.return_value.status_code = 200
        mock_post.return_value.json.return_value = {"data": {}}

        api = APIHandler()
        response = api.post("/classifieds/cars/search/searchByUrlParams")
        self.assertIsInstance(response, dict)

    @patch("requests.post")
    def test_post_retry_on_503(self, mock_post):
        mock_post.return_value.status_code = 503

        api = APIHandler()
        with self.assertRaises(ValueError):
            api.post("/classifieds/cars/search/searchByUrlParams", max_retries=1)


class TestKslCarsSearch(unittest.TestCase):
    @patch("ksl_cars.APIHandler.post")
    def test_ksl_cars_search(self, mock_post):
        mock_post.return_value = {
            "items": [
                {
                    "id": "12345",
                    "makeYear": "2010",
                    "price": "8000",
                    "make": "Toyota",
                    "model": "Corolla",
                    "displayTime": "1638467200",
                }
            ]
        }

        filters = VehicleSearchFilters(make="Toyota", priceTo=10000)
        listings = list(ksl_cars_search(filters=filters))

        self.assertEqual(len(listings), 1)
        self.assertEqual(listings[0].listing_title, "2010 Toyota Corolla")


if __name__ == "__main__":
    unittest.main()

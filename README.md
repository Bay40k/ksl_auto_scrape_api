# KSL Cars API Wrapper

This project provides a Python wrapper for the KSL Cars API, enabling users to search for vehicle listings with customizable filters and retrieve detailed information about the listings.

## Overview

This wrapper allows you to:

- Search KSL Cars listings based on various filters like price, mileage, transmission type, etc.
- Retrieve and display the search results in a structured format.
- Easily customize and extend search parameters using Python's `dataclasses`.

## Requirements

- Python 3.10+
- `requests`

You can install the required packages via pip:

```bash
pip install requests
```

## Usage

### Example Script

The [example.py](example.py) script demonstrates how to use the KSL Cars API wrapper to search for car listings.

### Key Components

- **VehicleSearchFilters:** A dataclass to define filters for the car search. You can specify filters like `sellerType`, `newUsed`, `priceTo`, `transmission`, and more.
  
- **ksl_cars_search:** A generator function that takes a `keyword`[`str`] and/or a `filters`[`VehicleSearchFilters`] object, and retrieves car listings. It yields `VehicleListing` objects.

- **VehicleListing:** A dataclass that represents a car listing with attributes like `listing_title`, `year`, `make`, `model`, `price`, `url`, and more.

### Available Filters

You can customize your search using the following filters:

(Values are case sensitive)

- `sellerType`: "For Sale By Owner", "Dealership"
- `newUsed`: "Used", "New", "Certified", "Sold"
- `transmission`: "Automatic", "Manual", "CVT", "Automanual"
- `fuel`: "Compressed Natural Gas", "Diesel", "Electric", "Flex Fuel", "Gasoline", "Hybrid"
- `drive`: "2-Wheel Drive", "4-Wheel Drive", "AWD", "FWD", "RWD"
- `titleType`: "Clean Title", "Dismantled Title", "Not Specified", "Rebuilt/Reconstructed Title", "Salvage Title"
- `numberOfSeats`: 1, 2, 3, 4, 5, 6, 7, 8, 9
- `cabSize`: "Crew Cab", "Extended Cab", "Regular Cab"
- `cylinders`: 2, 3, 4, 5, 6, 8, 10, 12
- `numberDoors`: 1, 2, 3, 4, 5
- `bedSize`: "Longbed", "Shortbed", "Standard Longbed", "Standard Shortbed"
- `body`: "Compact", "Convertible", "Coupe", "Hatchback", "Sedan", "SUV", "Truck", "Van", "Wagon", "Minivan", "Crossover", "Industrial / Semi"
- `paint`: "Beige", "Black", "Blue", "Bronze", "Brown", "Creme", "Gold", "Gray", "Green", "Orange", "Other", "Pink", "Purple", "Red", "Silver", "Tan", "White", "Yellow"
- `upholstery`: Same as `paint`
- `interiorCondition`: "Poor", "Fair", "Good", "Very Good", "Excellent"
- `exteriorCondition`: Same as `interiorCondition`
- `liter`: Engine displacement options like "1.0L", "1.1L", "1.2L", etc.
- `sort`: Sort results based on various criteria:
  - 0 = Newest to Oldest
  - 1 = Oldest to Newest
  - 2 = Price Low to High
  - 3 = Price High to Low
  - 4 = Newest to Oldest Model Year
  - 5 = Oldest to Newest Model Year
  - 6 = Mileage Low to High
  - 7 = Mileage High to Low

### Running the Example

To run the example:

```bash
pip install pandas # Required for displaying the results in a tabular format
python example.py
```

This will print out a list of vehicles that match the filters specified in the script.

### More Examples
```python
from ksl_cars_api import VehicleSearchFilters

my_filters = VehicleSearchFilters(
    sellerType="Dealership"
)
my_filters.newUsed = "Used"

for listing in ksl_cars_search(filters=my_filters):
    print(listing)

# or

listings = list(ksl_cars_search(filters=my_filters, page_limit=5)) # Limit to 5 pages of results, default is 1

# Can also omit filters for just a keyword search
listings = list(ksl_cars_search("Toyota Camry"))

# Or combine filters and keyword search
listings = list(ksl_cars_search("Toyota Camry", filters=my_filters))
```
#### Get all available makes, models, and trims:

```python
from ksl_cars import get_makes_models_trims

# Returns list of all available makes
makes = get_makes_models_trims()

# Returns list of all Honda models
honda_models = get_makes_models_trims(make="Honda")

# Returns list of all Honda Civic trims
civic_trims = get_makes_models_trims(make="Honda", model="Civic")
```
Example output of `civic_trims`:
```commandline
[
    "1500 DX",
    "1500 GL",
    "CX",
    "CX-G",
    "DX",
    "DX-G",
    "DX-VP",
    "Del Sol",
    "Del Sol S",
    "Del Sol Si",
    "EX",
    "EX SE",
    "EX SSRS",
    "EX-A",
    "EX-G",
    "EX-L",
    "EX-L Navi",
    "EX-T",
    "FE",
    "GX",
    "HF",
    "HX",
    "Hybrid",
    "LX",
    "LX \"A\"",
    "LX SE",
    "LX SSRS",
    "LX-G",
    "LX-G SE",
    "LX-P",
    "LX-S",
    "Reverb",
    "S",
    "SE",
    "SSRS",
    "Si",
    "Si Mugen",
    "Special Edition",
    "Sport",
    "Sport Touring",
    "Touring",
    "Type R Touring",
    "VP",
    "VP SSRS",
    "VX"
]
```

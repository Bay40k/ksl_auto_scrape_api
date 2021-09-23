# ksl_auto_scrape_api

Pull KSL car listings using the API.

Dependencies:
- Requests

Example (keyword) usage and output:
```python
from ksl_auto import ksl_auto_search
import json

listings = ksl_auto_search(keyword="Honda civic", page=1)
print(json.dumps(listings, indent=4))
```
Output: 
```commandline
{
    "0": {
        "listing_title": "2018 Honda Civic EX",
        "year": 2018,
        "make": "Honda",
        "model": ["Civic", "CR-V"],
        "trim": "EX",
        "price": "$20995",
        "miles": 16421,
        "new_or_used": "Used",
        "location": "Lindon, UT",
        "vin": "2HGFC2F75JH562993",
        "body_type": "Sedan",
        "fuel_type": "Gasoline",
        "transmission": "Automatic",
        "link": "https://cars.ksl.com/listing/7208577",
        "seller_type": "Dealership",
        "title_type": null,
        "time_created_utc": "2021-05-24 23:30:22",
        "unix_timestamp": 1621899022
    }, ...
}
```
Usage with filters:
```python
from ksl_auto import ksl_auto_search

# Note, filter values can be lists or strings, any filter can also be omitted
filters = {
        "make": "Honda",
        "model": "Civic",
        "trim": "DX",
        "priceFrom": "10",
        "priceTo": "100000",
        "mileageFrom": "0",
        "mileageTo": "100000",
        "sellerType": ["For Sale By Owner", "Dealership"],
        "newUsed": ["New", "Used", "Certified"],
        "transmission": "Manual",
        "fuel": "Gasoline",
        "drive": "FWD",
        "titleType": "Clean Title"
}

listings = ksl_auto_search(filters=filters)
```
Allowed values for various filters (case sensitive):
```
sellerType:   "For Sale By Owner", "Dealership"
newUsed:      "Used", "New", "Certified"
transmission: "Automatic", "Manual", "CVT", "Automanual"
fuel:         "Compressed Natural Gas", "Diesel", "Electric", "Flex Fuel", "Gasoline", "Hybrid"
drive:        "2-Wheel Drive", "4-Wheel Drive", "AWD", "FWD", "RWD"
titleType:    "Clean Title", "Dismantled Title", "Not Specified", "Rebuilt/Reconstructed Title", "Salvage Title"
```
Get all available makes, models, and trims:
```python
from ksl_auto import get_makes_models_trims

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

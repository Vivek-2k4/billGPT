from fastapi import APIRouter

from ..schemas import SearchRequest
from ..services.deals import PRODUCTS
from ..services.rewards import CARDS

router = APIRouter()


@router.post("/")
def search_product(request: SearchRequest):

    results = PRODUCTS.get(
        request.query.lower(),
        []
    )

    if not results:
        return {
            "query": request.query,
            "results": [],
            "message": "No products found"
        }

    cheapest = min(
        results,
        key=lambda item: item["price"]
    )

    best_card = None
    lowest_effective_price = cheapest["price"]

    for card in CARDS:
        effective_price = cheapest["price"] * (
            1 - card["reward_percent"] / 100
        )

        if effective_price < lowest_effective_price:
            lowest_effective_price = effective_price

            best_card = {
                "card": card["name"],
                "reward_percent": card["reward_percent"],
                "effective_price": round(
                    effective_price,
                    2
                )
            }

    return {
        "query": request.query,
        "results": results,
        "cheapest": cheapest,
        "best_way_to_pay": best_card
    }
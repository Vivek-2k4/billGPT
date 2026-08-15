from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Comparison
from ..schemas import (
    ComparisonCreate,
    ComparisonResponse
)
from ..dependencies import get_current_user

router = APIRouter()


@router.post(
    "/save",
    response_model=ComparisonResponse
)
def save_comparison(
    comparison: ComparisonCreate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    new_comparison = Comparison(
        user_id=current_user["user_id"],
        query=comparison.query,
        best_source=comparison.best_source,
        best_price=comparison.best_price
    )

    db.add(new_comparison)
    db.commit()
    db.refresh(new_comparison)

    return new_comparison


@router.get(
    "/my",
    response_model=list[ComparisonResponse]
)
def get_my_comparisons(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    comparisons = (
        db.query(Comparison)
        .filter(
            Comparison.user_id == current_user["user_id"]
        )
        .all()
    )

    return comparisons
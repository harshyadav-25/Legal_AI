from fastapi import APIRouter, HTTPException, Depends, Request, status
from fastapi.security import OAuth2PasswordRequestForm

from app.models.user import UserCreate
from app.core.security import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/signup")
async def signup(data: UserCreate, request: Request):
    db = request.app.state.db  # ✅ CORRECT ACCESS

    existing_user = await db.users.find_one({"email": data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    await db.users.insert_one({
        "email": data.email,
        "password": hash_password(data.password)
    })

    return {"message": "User created successfully"}


@router.post("/login")
async def login(
    request: Request,
    form_data: OAuth2PasswordRequestForm = Depends()
):
    db = request.app.state.db  # ✅ CORRECT ACCESS

    user = await db.users.find_one({"email": form_data.username})
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    if not verify_password(form_data.password, user["password"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = create_access_token({"sub": user["email"]})

    # Extract name from email for now (until we add a Full Name field)
    name = user["email"].split("@")[0]

    return {
        "access_token": token,
        "token_type": "bearer",
        "user_name": name
    }

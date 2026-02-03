from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

class MongoDB:
    client: AsyncIOMotorClient = None

mongodb = MongoDB()

def connect_to_mongo():
    mongodb.client = AsyncIOMotorClient(settings.MONGODB_URL)

def close_mongo_connection():
    if mongodb.client:
        mongodb.client.close()

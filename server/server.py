from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = pickle.load(open('./models/fake_news_model.pkl', 'rb'))
vectorizer = pickle.load(open('./models/tfidf_vectorizer.pkl', 'rb'))

class NewsInput(BaseModel):
    text: str

@app.post("/predict")
def predict(input: NewsInput):
    vec = vectorizer.transform([input.text])
    pred = model.predict(vec)[0]
    print(pred)
    return {"label": "Real" if pred == 1 else "Fake"}
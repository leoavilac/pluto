from random import sample
from locust import HttpUser, between, task
import json

casos = []

def carga():
    global casos
    with open('traffic.json', 'r') as file:
        casos = json.load(file)
    
def dato():
    global casos
    if len(casos) > 0:
        return sample(casos, 1)
    else:
        print("NO CASES")
        pass

class WebsiteUser(HttpUser):
    wait_time = between(1, 5)
    carga()

    @task
    def index(self):
        r = dato()[0]
        self.client.post("/api", None, r)

# locust --host=http://34.125.192.186:3001 --locustfile traffic.py --headless --users 100 --spawn-rate 5 -t 30s
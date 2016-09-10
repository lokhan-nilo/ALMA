import pyrebase
from config.config import username, password

class Firebase(object):
    def __init__(self):
        config = {
            "apiKey": "AIzaSyBch97dQuSayarcFVa3tsG3MxrcLke8LV0",
            "authDomain": "asti-2d7bd.firebaseapp.com",
            "databaseURL": "https://asti-2d7bd.firebaseio.com",
            "storageBucket": "asti-2d7bd.appspot.com",
            "serviceAccount": "firebase/Asti-72defd5ee1a9.json"

        }
        
        self.firebase = pyrebase.initialize_app(config)
        auth = self.firebase.auth()
        self.user = auth.sign_in_with_email_and_password(username, password)
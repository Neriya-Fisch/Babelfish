import pyttsx3

class TextToSpeech:
    def __init__(self, gender='male'):
        self.engine = pyttsx3.init()
        self.engine.setProperty('voice', gender)

    def Speak(self, text):
        self.engine.say(text)
        self.engine.runAndWait()

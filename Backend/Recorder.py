import speech_recognition as sr
class Recorder:
    def __init__(self):
        self.recognizer = sr.Recognizer()
        
    def Record(self):
        with sr.Microphone() as source:
            print("I'm listening")
            audio = self.recognizer.listen(source)
        return audio
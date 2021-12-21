import pyttsx3
class TextToSpeech:
    def __init__(self, gender='male'):
        self.engine = pyttsx3.init()
        self.gender = gender
        voice = self.SetUpGender()
        self.engine.setProperty('voice', voice)

    def Speak(self, text):
        self.engine.say(text)
        self.engine.runAndWait()

    def SetUpGender(self):
        voices = self.engine.getProperty('voices')
        voice =  1 if self.gender == 'male' else 0
        return voices[voice].id
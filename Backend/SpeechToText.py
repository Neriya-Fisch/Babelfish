import speech_recognition as sr

class SpeechToText:
    def __init__(self, language='en'):
        self.language = language
        self.recognizer = sr.Recognizer()

    def GetText(self, audio):
        text = ""
        try:
            text = self.recognizer.recognize_google(audio, language=self.language)
        except sr.UnknownValueError:
            print("Google Speech Recognition could not understand the audio")
        except sr.RequestError as e:
            print("Could not request results from Google Speech Recognition service; {0}".format(e))
        return text

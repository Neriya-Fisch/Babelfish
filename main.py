from Backend.Recorder import Recorder
from Backend.SpeechToText import SpeechToText
from Backend.TextToSpeech import TextToSpeech
from Backend.TextTranslator import TextTranslator
import pyttsx3

# engine = pyttsx3.init()
# engine.setProperty('voice', 'female'.id)
# engine.say('Sally sells seashells by the seashore.')
# engine.runAndWait()

# engine = pyttsx3.init()
# voices = engine.getProperty('voices')
# for voice in voices:
#    engine.setProperty('voice', voice.id)
#    engine.say('The quick brown fox jumped over the lazy dog.')
# engine.runAndWait()



recorder = Recorder()
audio = recorder.Record()
speech_to_text = SpeechToText('en')
audio_text = speech_to_text.GetText(audio)
text_translator = TextTranslator('fr')
translated_audio_text = text_translator.Translate(audio_text)
text_to_speech = TextToSpeech()
text_to_speech.Speak(translated_audio_text) 
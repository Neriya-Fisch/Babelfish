from Backend.Recorder import Recorder
from Backend.SpeechToText import SpeechToText
from Backend.TextToSpeech import TextToSpeech
from Backend.TextTranslator import TextTranslator


recorder = Recorder()
audio = recorder.Record()
speech_to_text = SpeechToText('en')
audio_text = speech_to_text.GetText(audio)
text_translator = TextTranslator('fr')
translated_audio_text = text_translator.Translate(audio_text)
text_to_speech = TextToSpeech()
text_to_speech.Speak(translated_audio_text) 
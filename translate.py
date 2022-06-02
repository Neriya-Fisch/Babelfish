from Backend.TextTranslator import TextTranslator
import sys


message, dest_language = sys.argv[1], sys.argv[2]
text_translator = TextTranslator(dest_language)
translated_message = text_translator.Translate(message)
print(translated_message)

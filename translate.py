from Backend.TextTranslator import TextTranslator
import sys


message = sys.argv[1]
text_translator = TextTranslator('fr')
translated_message = text_translator.Translate(message)
print(translated_message)

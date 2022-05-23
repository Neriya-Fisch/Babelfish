from googletrans import Translator

class TextTranslator:
    def __init__(self, dest_language, src_language):
        self.translator = Translator()
        self.dest_language = dest_language
        self.src_language = src_language
        
    def Translate(self, text):
        return self.translator.translate(text, dest=self.dest_language, src=self.src_language).text


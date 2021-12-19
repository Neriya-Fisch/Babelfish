from googletrans import Translator


translator = Translator()
s = "אני הולך לבית ספר,  מחר כבר נעשה את השיעורי בית\n לילה טוב אמא"
out1 = translator.translate(s, dest="en")
print(out1.text)

s = "I'm going to school, tomorrow already done the homework"
out2 = translator.translate(s, dest="he")
print(out2.text)
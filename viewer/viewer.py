from PySide6.QtWidgets import QApplication
from PySide6.QtWebEngineWidgets import QWebEngineView
from PySide6.QtCore import QTimer


app = QApplication([])
view = QWebEngineView()

view.load("file:////home/teseumvi/dynamic-slides/viewer.html")
view.showFullScreen()

def trigger_overlay(msg):
    js = f"showOverlayFromPython('{msg}', 2500);"
    view.page().runJavaScript(js)


while True:
    escolha = input("Escolha: ")
    if escolha=="q":
        break
    trigger_overlay(escolha)

#QTimer.singleShot(2000, trigger_overlay)

app.exec()

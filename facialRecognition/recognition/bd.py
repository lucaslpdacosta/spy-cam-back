# se conectar ao banco e pegar as fotos
import mysql.connector
import datetime

class BD:
    def __init__(self):

        self.mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="day123456",
        database="spy_cam"
        )

        self.mycursor = self.mydb.cursor()

    def insertNotificationConhecido(self, msg, id):
        sql = """INSERT INTO registro 
        (mensagem, enviado, pessoa_id, createdAt, updatedAt) 
        VALUES (%s, %s, %s, NOW(), NOW())"""

        self.mycursor.execute(sql, (msg, True, id))
        self.mydb.commit()

    
    def insertNotificationDesconhecido(self, msg):
        sql = """INSERT INTO registro 
        (mensagem, enviado, createdAt, updatedAt) 
        VALUES (%s, %s, NOW(), NOW())"""

        self.mycursor.execute(sql, (msg, True))
        self.mydb.commit()


    # POR ENQUANTO PEGAR APENAS O ULTIMO REGISTRO
    def getPhotos(self):
        self.mycursor.execute("SELECT id, nome_pessoa, fotos FROM pessoa ORDER BY id DESC LIMIT 1")
        res = self.mycursor.fetchall()
        return res
    
    def verificarNotificacao(self):
        x = "SELECT pessoa_id, createdAt from registro order by id desc limit 1"
        self.mycursor.execute(x)
        res = self.mycursor.fetchall()
        return res
    

from flask import Flask, render_template, request, redirect, url_for,jsonify
import pymysql

app = Flask(__name__)

def get_db_connection():
    return pymysql.connect(host='localhost',
                           user='root',
                           password='',
                           database='uts_database')

@app.route('/')
def index():
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM books')
    books = cursor.fetchall()
    connection.close()
    
      
    return render_template('index_1123102115.html', books=books)

@app.route('/tambah', methods=['GET', 'POST'])
def tambah():
    if request.method == 'POST':
        judul = request.form['judul']
        pengarang = request.form['pengarang']
        tahun_terbit = request.form['tahun_terbit']
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute('INSERT INTO books (judul, pengarang, tahun_terbit) VALUES (%s, %s, %s)', (judul, pengarang, tahun_terbit))
        connection.commit()
        connection.close()
        return redirect(url_for('index'))
    return render_template('tambah_1123102115.html')

@app.route('/edit/<int:id>', methods=['GET', 'POST'])
def edit(id):
    connection = get_db_connection()
    cursor = connection.cursor()
    if request.method == 'POST':
        judul = request.form['judul']
        pengarang = request.form['pengarang']
        tahun_terbit = request.form['tahun_terbit']
        cursor.execute('UPDATE books SET judul = %s, pengarang = %s, tahun_terbit = %s WHERE id = %s', (judul, pengarang, tahun_terbit, id))
        connection.commit()
        connection.close()
        return redirect(url_for('index'))
    else:
        cursor.execute('SELECT * FROM books WHERE id = %s', (id,))
        book = cursor.fetchone()
        connection.close()
        return render_template('edit_1123102115.html', book=book)

if __name__ == '__main__':
    app.run(debug=True)

import csv
import datetime

with open('TSLA.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    result = []
    for row in csv_reader:
        if line_count != 0:
            date = int(datetime.datetime.strptime(row[0], '%Y-%m-%d').timestamp() * 1000)
            result.append({"x": date, "y": float(row[1])})
        line_count += 1
    print(f'Processed {line_count} lines.')
    print(result)
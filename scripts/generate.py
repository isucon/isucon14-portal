import csv
 
 # CSVファイルのパス
csv_file = 'code.csv'

# 出力するSQLファイルのパス
sql_file = 'bulk_insert.sql'

# 除外したい team_id をリストで指定
excluded_team_ids = [1,5] # 例: team_id 5 と 10 を除外

# 設定する team_id の最大値
max_team_id = 1500

# BULK INSERTの開始部分
insert_query = "INSERT INTO `coupons` (`team_id`, `code`, `created_at`, `updated_at`) VALUES\n"

# 初期 team_id
team_id = 1

# CSVファイルを読み込み、SQL文を生成
with open(csv_file, newline='') as csvfile:
    reader = csv.reader(csvfile)
    next(reader)  # ヘッダーをスキップ

    values = []
    for row in reader:
        code = row[0]
        
        # 除外する team_id をスキップ
        while team_id in excluded_team_ids:
            team_id += 1

        values.append(f"({team_id}, '{code}', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP())")
        team_id += 1  # 次の team_id にインクリメント

        # team_id が最大値を超えたら終了
        if team_id > max_team_id:
            break

    # SQL文を完成させる
    insert_query += ",\n".join(values) + ";"

# SQLファイルに出力
with open(sql_file, 'w') as f:
    f.write(insert_query)

print(f"BULK INSERT SQL generated and saved to {sql_file}")

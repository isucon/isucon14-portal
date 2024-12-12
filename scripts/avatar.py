import csv
import os
import requests

# CSVファイルのパス
csv_file = "avatar.csv"

# 保存先ディレクトリ
output_dir = "./avatars"

# 保存先ディレクトリが存在しない場合、作成する
os.makedirs(output_dir, exist_ok=True)

# CSVファイルを開いて読み込み、画像をダウンロードして保存する
with open(csv_file, mode="r", encoding="utf-8") as file:
    reader = csv.DictReader(file)  # ヘッダーを利用して辞書形式で読み込む
    for row in reader:
        name = row.get("name")
        avatar_url = row.get("avatar_url")
        
        # 必要なデータが欠けている場合はスキップ
        if not name or not avatar_url:
            print(f"Skipped due to missing data: {row}")
            continue

        try:
            # 画像をダウンロード
            response = requests.get(avatar_url, stream=True)
            response.raise_for_status()  # HTTPエラーが発生した場合、例外をスローする
            
            # 保存先ファイルパス
            file_path = os.path.join(output_dir, f"{name}.png")
            
            # 画像データを保存
            with open(file_path, "wb") as img_file:
                for chunk in response.iter_content(chunk_size=8192):
                    img_file.write(chunk)
            
            print(f"Saved: {file_path}")
        
        except requests.RequestException as e:
            print(f"Failed to download {avatar_url}: {e}")

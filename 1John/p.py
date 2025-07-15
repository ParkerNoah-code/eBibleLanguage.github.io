import os

# Directory to store the files
output_dir = "1John"
os.makedirs(output_dir, exist_ok=True)

# List of tuples: (filename, name, passage)
sections = [
    ("1_1-3.html", "The Word Revealed", "1:1–3"),
    ("1_4.html", "Purpose: Fulfilled Joy", "1:4"),
    ("1_5.html", "God is Light", "1:5"),
    ("1_6-7.html", "Fellowship in the Light", "1:6–7"),
    ("1_8-10.html", "Confession and Forgiveness", "1:8–10"),
    ("2_1-2.html", "Christ Our Advocate", "2:1–2"),
    ("2_3-6.html", "Obedience and Imitation", "2:3–6"),
    ("2_7-8.html", "The New Commandment", "2:7–8"),
    ("2_9-11.html", "Love and Light", "2:9–11"),
    ("2_12-14.html", "Address to Believers", "2:12–14"),
    ("2_15-17.html", "Do Not Love the World", "2:15–17"),
    ("2_18-21.html", "Antichrists and the Last Hour", "2:18–21"),
    ("2_22-23.html", "Denial of the Son", "2:22–23"),
    ("2_24-25.html", "Abide in the Word", "2:24–25"),
    ("2_26-27.html", "Taught by the Anointing", "2:26–27"),
    ("2_28-29.html", "Confidence in His Coming", "2:28–29"),
    ("3_1-3.html", "God's Love and Our Hope", "3:1–3"),
    ("3_4-6.html", "Lawlessness vs. Abiding", "3:4–6"),
    ("3_7-10.html", "Children of God or the Devil", "3:7–10"),
    ("3_11-15.html", "Love vs. Hatred", "3:11–15"),
    ("3_16-18.html", "Sacrificial Love", "3:16–18"),
    ("3_19-22.html", "Assurance Before God", "3:19–22"),
    ("3_23-24.html", "Belief, Love, and the Spirit", "3:23–24"),
    ("4_1-3.html", "Test the Spirits", "4:1–3"),
    ("4_4-6.html", "Knowing the Spirit of Truth", "4:4–6"),
    ("4_7-10.html", "Love and Atonement", "4:7–10"),
    ("4_11-16.html", "Perfected Love", "4:11–16"),
    ("4_17-21.html", "Love and Fearlessness", "4:17–21"),
    ("5_1-5.html", "Faith Overcomes the World", "5:1–5"),
    ("5_6-9.html", "The Triple Witness", "5:6–9"),
    ("5_10-12.html", "The Testimony of Life", "5:10–12"),
    ("5_13-15.html", "Confidence in Prayer", "5:13–15"),
    ("5_16-17.html", "Sin Leading to Death", "5:16–17"),
    ("5_18-20.html", "Born of God, Kept from Evil", "5:18–20"),
    ("5_21.html", "Guard Yourselves from Idols", "5:21"),
]

# HTML template with placeholders
html_template = '''<!DOCTYPE html>
<html lang="en">
  <head>
    <title>eBibleLanguage</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../Styles.css" />
    <link rel="icon" href="../cross_image.ico" />
    <link rel="manifest" href="../manifest.json" />
    <meta name="theme-color" content="#003366" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="eBibleLanguage" />
    <link rel="apple-touch-icon" href="../cross_image.png" />
    <link
      rel="apple-touch-startup-image"
      href="../cross_image.png"
      media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
    />
  </head>
  <body>
    <div class="content">
      <nav>
        <p>
          <a href="../index.html">Lessons</a> &gt;
          <a href="../1John/Overview.html">1 John</a> &gt;
          <a href="../1John/{name}.html">{name}</a>
        </p>
      </nav>
      <h2>1 John {passage}</h2>
    </div>
    <script src="../script.js"></script>
  </body>
</html>
'''

# Write each file
for filename, name, passage in sections:
    content = html_template.format(name=name, passage=passage)
    filepath = os.path.join(output_dir, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Generated {len(sections)} HTML files in '{output_dir}' directory.")

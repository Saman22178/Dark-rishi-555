# Node.js 20 version එක පාවිච්චි කිරීම
FROM node:20

# ඇප් එක රන් වෙන්න ඕනේ folder එක හැදීම
WORKDIR /app

# Dependencies install කිරීමට අවශ්‍ය ෆයිල්ස් කොපි කිරීම
COPY package*.json ./

# Libraries install කිරීම (Express ඇතුළුව)
RUN npm install

# මුළු ප්‍රොජෙක්ට් එකම (api folder එකත් ඇතුළුව) කොපි කිරීම
COPY . .

# Koyeb එකට පෝට් එක විවෘත කර දීම
EXPOSE 8000

# ප්‍රධාන ෆයිල් එක (api/index.js) රන් කරන විධානය
CMD ["node", "api/index.js"]

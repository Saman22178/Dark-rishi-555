# Node.js 20 environment එක පාවිච්චි කිරීම
FROM node:20

# ඇප් එක රන් වන folder එක සකස් කිරීම
WORKDIR /app

# Dependencies install කිරීමට අවශ්‍ය files කොපි කිරීම
COPY package*.json ./

# Express ඇතුළු සියලුම libraries install කිරීම
RUN npm install

# මුළු project එකම copy කිරීම (api folder එකත් ඇතුළුව)
COPY . .

# Koyeb එකට 8000 port එක විවෘත කිරීම
EXPOSE 8000

# ඇප් එක ආරම්භ කරන විධානය
CMD ["node", "api/index.js"]

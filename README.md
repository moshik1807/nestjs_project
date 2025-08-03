# מערכת ניהול משמרות ושיבוצים

## תיאור הפרויקט
מערכת ניהול משמרות ושיבוצים המיועדת לניהול משמרות חיילים. המערכת מבוססת על NestJS עם TypeORM ו-MySQL, וכוללת מערכת הרשאות מתקדמת.

## טכנולוגיות
- **Backend**: NestJS
- **Database**: MySQL
- **ORM**: TypeORM
- **Authentication**: JWT
- **Password Hashing**: bcrypt

## מבנה הפרויקט
```
src/
├── auth/           # מודול אימות והרשאות
├── users/          # ניהול משתמשים
├── shifts/         # ניהול משמרות
├── assignments/    # ניהול שיבוצים
└── main.ts        # נקודת הכניסה
```

## הרשאות במערכת
### מפקד (Commander)
- יצירת משמרות חדשות
- יצירת שיבוצים חדשים
- צפייה בכל המשתמשים
- צפייה בכל השיבוצים
- צפייה בשיבוצים של חיילים ספציפיים

### חייל (Soldier)
- צפייה במשמרות
- צפייה בשיבוצים שלו בלבד

## התקנה והרצה

### דרישות מקדימות
- Node.js
- MySQL
- npm או yarn

### התקנה
```bash
# התקנת תלויות
npm install

# הגדרת בסיס נתונים
# צור בסיס נתונים בשם 'nestProject' ב-MySQL
```

### הרצת הפרויקט
```bash
# הרצה במצב פיתוח
npm run start:dev

# הרצה במצב production
npm run start:prod
```

## API Endpoints

### Authentication
#### התחברות
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "your_username",
    "password": "your_password"
  }'
```

#### בדיקת אימות
```bash
curl -X GET http://localhost:3000/auth \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Users
#### הרשמת משתמש חדש
```bash
curl -X POST http://localhost:3000/users/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "new_user",
    "password": "password123",
    "role": "soldier"
  }'
```

#### צפייה בכל המשתמשים (רק מפקד)
```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Shifts
#### יצירת משמרת חדשה (רק מפקד)
```bash
curl -X POST http://localhost:3000/shifts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "startTime": "08:00",
    "endTime": "16:00",
    "location": "Gate A"
  }'
```

#### צפייה בכל המשמרות
```bash
curl -X GET http://localhost:3000/shifts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### צפייה במשמרת ספציפית
```bash
curl -X GET http://localhost:3000/shifts/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Assignments
#### יצירת שיבוץ חדש (רק מפקד)
```bash
curl -X POST http://localhost:3000/assignments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "shiftId": 1,
    "soldierId": 2
  }'
```

#### צפייה בכל השיבוצים (מפקד: הכל, חייל: שלו בלבד)
```bash
curl -X GET http://localhost:3000/assignments \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### צפייה בשיבוץ ספציפי
```bash
curl -X GET http://localhost:3000/assignments/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### צפייה בשיבוצים של חייל ספציפי
```bash
curl -X GET http://localhost:3000/assignments/soldier/2 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## דוגמאות שימוש מלאות

### תרחיש 1: הרשמה והתחברות של מפקד
```bash
# 1. הרשמת מפקד
curl -X POST http://localhost:3000/users/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "commander1",
    "password": "password123",
    "role": "commander"
  }'

# 2. התחברות
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "commander1",
    "password": "password123"
  }'

# התגובה תכיל טוקן JWT
```

### תרחיש 2: יצירת משמרת ושיבוץ חייל
```bash
# 1. יצירת משמרת (עם טוקן מפקד)
curl -X POST http://localhost:3000/shifts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer COMMANDER_JWT_TOKEN" \
  -d '{
    "startTime": "06:00",
    "endTime": "14:00",
    "location": "Main Gate"
  }'

# 2. הרשמת חייל
curl -X POST http://localhost:3000/users/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "soldier1",
    "password": "password123",
    "role": "soldier"
  }'

# 3. שיבוץ החייל למשמרת (עם טוקן מפקד)
curl -X POST http://localhost:3000/assignments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer COMMANDER_JWT_TOKEN" \
  -d '{
    "shiftId": 1,
    "soldierId": 2
  }'
```

### תרחיש 3: חייל בודק את השיבוצים שלו
```bash
# 1. התחברות כחייל
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "soldier1",
    "password": "password123"
  }'

# 2. צפייה בשיבוצים (יראה רק את השיבוצים שלו)
curl -X GET http://localhost:3000/assignments \
  -H "Authorization: Bearer SOLDIER_JWT_TOKEN"
```

## בסיס הנתונים

### טבלת Users
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);
```

### טבלת Shifts
```sql
CREATE TABLE shifts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    startTime VARCHAR(10) NOT NULL,
    endTime VARCHAR(10) NOT NULL,
    location VARCHAR(255) NOT NULL
);
```

### טבלת Assignments
```sql
CREATE TABLE assignments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shiftId INT NOT NULL,
    soldierId INT NOT NULL,
    FOREIGN KEY (shiftId) REFERENCES shifts(id),
    FOREIGN KEY (soldierId) REFERENCES users(id)
);
```

## אבטחה
- כל הסיסמאות מוצפנות באמצעות bcrypt
- JWT tokens עם תוקף של שעה
- הרשאות מבוססות תפקידים (RBAC)
- הגנה על endpoints רגישים

## שגיאות נפוצות
- **401 Unauthorized**: טוקן לא תקין או חסר
- **403 Forbidden**: אין הרשאות מתאימות
- **404 Not Found**: המשאב לא נמצא

## פיתוח
```bash
# הרצת טסטים
npm run test

# הרצת טסטים עם כיסוי
npm run test:cov

# בדיקת linting
npm run lint
```

## תרומה לפרויקט
1. צור fork של הפרויקט
2. צור branch חדש למשימה שלך
3. בצע commit לשינויים שלך
4. פתח Pull Request

## רישיון
MIT License
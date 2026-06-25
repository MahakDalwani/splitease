# 💸 SplitEase — Split Anything, Fairly

A free online tool to split any shared expense fairly among a group of people — trips, rent, groceries, subscriptions, movies, shopping, and more.

🔗 **Live Tool:** https://splitease-beryl.vercel.app
📁 **GitHub Repo:** https://github.com/MahakDalwani/splitease

---

## 👩‍💻 Built By

**Mahak Dalwani** · mahakdalwani1@gmail.com

---

## 🛠️ What This Tool Does

Most bill splitting tools are built only for restaurants. SplitEase works for every kind of shared expense — a road trip with friends, monthly rent with flatmates, a group shopping haul, or a shared Netflix subscription.

**Core Features:**
- Add any number of people to the split
- Add multiple expenses and assign each one to specific people
- Tip % and Tax % sliders that split proportionally (not equally)
- Smart Debt Simplification — minimizes the number of transactions needed to settle up
- Copy summary to share with the group
- Clean, mobile-friendly design

**The Unique Feature — Smart Debt Simplifier:**
Instead of everyone paying everyone else, the algorithm calculates the minimum number of transactions needed to settle all debts. For example, instead of 5 transactions back and forth, it reduces it to just 2. This is the same logic used internally by apps like Splitwise.

---

## 🧠 How It Works

**Step 1 — Add People**
Enter the names of everyone involved in the expense.

**Step 2 — Add Expenses**
Add each item or expense with its amount. Assign it to the specific people who share that expense.

**Step 3 — Set Tip & Tax**
Use the sliders to add optional tip and tax percentages. These are split proportionally — whoever spent more pays more tip and tax.

**Step 4 — Calculate & Split**
Click the button to see each person's total and the minimum transactions needed to settle up.

---

## ⚙️ Tech Stack

- **React** — UI and state management
- **CSS** — custom styling, no frameworks
- **LocalStorage** — history saved in browser
- **Vercel** — free deployment
- **GitHub** — version control

---

## 🧮 The Math Logic

**Item splitting:**
sharePerPerson = item.price / number of assigned people

**Proportional tip and tax:**
proportion = person's total / subtotal

person's tip = total tip amount × proportion

**Debt simplification algorithm:**

1.Calculate average each person should pay
2.Find each person's net balance (positive = owes, negative = owed)
3.Sort debtors and creditors largest first
4.Match biggest debtor with biggest creditor
5.Repeat until all balances are zero
---

## 🚀 Run Locally
git clone https://github.com/MahakDalwani/splitease.git
cd splitease
npm install
npm start
Open http://localhost:3000 in your browser.

---

## 📁 Project Structure
splitease/

├── public/

│   └── index.html

├── src/

│   ├── Components/

│   │   ├── Navbar.js

│   │   ├── Hero.js

│   │   ├── PeopleSection.js

│   │   ├── ItemsSection.js

│   │   ├── SettingsSection.js

│   │   └── ResultsSection.js

│   ├── logic/

│   │   └── calculate.js

│   ├── App.js

│   └── App.css

└── package.json

---

## 📌 Personal Note

I've personally been in situations where splitting a group trip or shared grocery run turned into a long confusing conversation. Everyone uses different UPI apps, people forget who paid what, and the mental math gets messy. I built SplitEase to solve exactly that — one clean page, enter the details, done.

---

*Built for Digital Heroes Trial Task · digitalheroesco.com*
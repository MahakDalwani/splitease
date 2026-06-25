// ============================================
// FUNCTION 1 — CALCULATE INDIVIDUAL TOTALS
// ============================================

export function calculateTotals(people, items, tipPercent, taxPercent) {

  // Give everyone a starting balance of 0
  const totals = {}
  people.forEach(person => {
    totals[person] = 0
  })
  // Result: { "Rahul": 0, "Priya": 0, "Aryan": 0 }


  // Loop through every item and split it
  items.forEach(item => {
    if (item.assignedTo.length === 0) return
    // Skip item if nobody assigned to it

    const sharePerPerson = item.price / item.assignedTo.length
    // Example: Pizza ₹500 shared by 2 people = ₹250 each

    item.assignedTo.forEach(person => {
      totals[person] += sharePerPerson
    })
  })


  // Calculate subtotal (sum of all items)
  const subtotal = items.reduce((sum, item) => sum + item.price, 0)
  // reduce() adds all prices together: 500 + 120 + 200 = 820


  // Add tip proportionally
  const tipAmount = subtotal * (tipPercent / 100)

  if (subtotal > 0) {
    people.forEach(person => {
      const proportion = totals[person] / subtotal
      // Whoever paid more of the bill, pays more of the tip
      totals[person] += tipAmount * proportion
    })
  }


  // Add tax proportionally (same logic as tip)
  const taxAmount = subtotal * (taxPercent / 100)

  if (subtotal > 0) {
    people.forEach(person => {
      const proportion = totals[person] / subtotal
      totals[person] += taxAmount * proportion
    })
  }


  // Round to 2 decimal places
  people.forEach(person => {
    totals[person] = Math.round(totals[person] * 100) / 100
  })

  return totals
}


// ============================================
// FUNCTION 2 — SIMPLIFY DEBTS (UNIQUE FEATURE)
// ============================================

export function simplifyDebts(people, totals) {

  // Find average each person should pay
  const values = Object.values(totals)
  const average = values.reduce((a, b) => a + b, 0) / values.length


  // Find each person's net balance
  // Positive = owes money
  // Negative = should receive money
  const balances = {}
  people.forEach(person => {
    balances[person] = Math.round((totals[person] - average) * 100) / 100
  })


  // Separate into debtors and creditors
  let debtors = []
  let creditors = []

  Object.entries(balances).forEach(([person, balance]) => {
    if (balance > 0.01) {
      debtors.push({ person, amount: balance })
    } else if (balance < -0.01) {
      creditors.push({ person, amount: Math.abs(balance) })
    }
  })

  // Sort largest first
  debtors.sort((a, b) => b.amount - a.amount)
  creditors.sort((a, b) => b.amount - a.amount)


  // Match biggest debtor with biggest creditor
  const transactions = []

  while (debtors.length > 0 && creditors.length > 0) {
    const debtor = debtors[0]
    const creditor = creditors[0]

    const payment = Math.round(
      Math.min(debtor.amount, creditor.amount) * 100
    ) / 100

    transactions.push({
      from: debtor.person,
      to: creditor.person,
      amount: payment
    })

    debtor.amount = Math.round((debtor.amount - payment) * 100) / 100
    creditor.amount = Math.round((creditor.amount - payment) * 100) / 100

    if (debtor.amount < 0.01) debtors.shift()
    if (creditor.amount < 0.01) creditors.shift()
  }

  return transactions
}
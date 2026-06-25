import { useState, useEffect } from 'react'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import PeopleSection from './Components/PeopleSection'
import ItemsSection from './Components/ItemsSection'
import SettingsSection from './Components/SettingsSection'
import ResultsSection from './Components/ResultsSection'
import HistorySection from './Components/HistorySection'
import { calculateTotals, simplifyDebts } from './logic/calculate'

function App() {

  // All data stored here as state
  const [people, setPeople] = useState([])
  const [items, setItems] = useState([])
  const [tip, setTip] = useState(0)
  const [tax, setTax] = useState(0)
  const [results, setResults] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [history, setHistory] = useState([])

  // Runs ONCE when the app first loads — pulls saved history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('splitHistory')
    // localStorage only stores text, so we convert it back into a real array
    if (saved) {
      setHistory(JSON.parse(saved))
    }
  }, [])
  // The empty [] means "only run this once, when the component mounts"


  // ---- PEOPLE ----

  function addPerson(name) {
    if (!name.trim()) return
    if (people.includes(name.trim())) {
      alert('Person already added!')
      return
    }
    setPeople([...people, name.trim()])
  }

  function removePerson(name) {
    setPeople(people.filter(p => p !== name))
    setItems(items.map(item => ({
      ...item,
      assignedTo: item.assignedTo.filter(p => p !== name)
    })))
  }


  // ---- ITEMS ----

  function addItem() {
    if (people.length < 2) {
      alert('Add at least 2 people first!')
      return
    }
    const newItem = {
      id: Date.now(),
      name: '',
      price: 0,
      assignedTo: [...people]
    }
    setItems([...items, newItem])
  }

  function removeItem(id) {
    setItems(items.filter(item => item.id !== id))
  }

  function updateItem(id, field, value) {
    setItems(items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  function togglePerson(itemId, personName) {
    setItems(items.map(item => {
      if (item.id !== itemId) return item
      const alreadyAssigned = item.assignedTo.includes(personName)
      return {
        ...item,
        assignedTo: alreadyAssigned
          ? item.assignedTo.filter(p => p !== personName)
          : [...item.assignedTo, personName]
      }
    }))
  }


  // ---- CALCULATE ----

  function handleCalculate() {
    if (people.length < 2) {
      alert('Add at least 2 people!')
      return
    }
    if (items.length === 0) {
      alert('Add at least 1 expense!')
      return
    }

    const totals = calculateTotals(people, items, tip, tax)
    const txns = simplifyDebts(people, totals)

    // ---- SAVE TO HISTORY ----
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      people: [...people],
    // Save a real copy of items, not a reference —
    // otherwise editing items later would silently change old history too
    items: items.map(item => ({ ...item, assignedTo: [...item.assignedTo] })),
    tip: tip,
    tax: tax,
    totals: totals,
    transactions: txns,
  }

    const updatedHistory = [newEntry, ...history]

  setHistory(updatedHistory)
  localStorage.setItem('splitHistory', JSON.stringify(updatedHistory))

  setResults(totals)
  setTransactions(txns)

  setTimeout(() => {
    document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}


  // ---- HISTORY ----

  function deleteHistoryItem(id) {
    const updatedHistory = history.filter(entry => entry.id !== id)
    setHistory(updatedHistory)
    localStorage.setItem('splitHistory', JSON.stringify(updatedHistory))
  }
  function editHistoryItem(entry) {
  // Load this past split's data back into the live calculator
  setPeople(entry.people)
  setItems(entry.items)
  setTip(entry.tip)
  setTax(entry.tax)

  // Clear the old results — they no longer match what's loaded,
  // user needs to click Calculate again to see fresh numbers
  setResults(null)
  setTransactions([])

  // Scroll to the top so they can see the loaded people/items
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

  function clearAllHistory() {
    setHistory([])
    localStorage.removeItem('splitHistory')
  }


  // ---- RESET ----

  function handleReset() {
    setPeople([])
    setItems([])
    setTip(0)
    setTax(0)
    setResults(null)
    setTransactions([])
  }


  return (
    <div className="app">

      <Navbar />
      <Hero />

      <main className="main-container">

        <PeopleSection
          people={people}
          onAdd={addPerson}
          onRemove={removePerson}
        />

        <ItemsSection
          items={items}
          people={people}
          onAdd={addItem}
          onRemove={removeItem}
          onUpdate={updateItem}
          onToggle={togglePerson}
        />

        <SettingsSection
          tip={tip}
          tax={tax}
          onTipChange={setTip}
          onTaxChange={setTax}
        />

        <button className="calculate-btn" onClick={handleCalculate}>
          Calculate & Split ✨
        </button>

        {results && (
          <ResultsSection
            people={people}
            results={results}
            transactions={transactions}
            onReset={handleReset}
          />
        )}

        <HistorySection
          history={history}
          onDelete={deleteHistoryItem}
          onClearAll={clearAllHistory}
          onEdit={editHistoryItem}
        />

      </main>

      <footer className="footer">
        <p>Made by <strong>Mahak Dalwani</strong> · <a href="mailto:mahakdalwani1@gmail.com" className="email-link">
          mahakdalwani1@gmail.com
        </a>
        </p>
        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noreferrer"
          className="dh-btn"
        >
          Built for Digital Heroes
        </a>
      </footer>

    </div>
  )
}

export default App
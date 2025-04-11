import React, { useState, useEffect } from "react";
import {
  CalendarIcon,
  SearchIcon,
  DownloadIcon,
  RefreshCw,
  FileText,
  ChevronDown,
  ChevronUp,
  Filter,
} from "lucide-react";
import "./CoursePaymentHistory.css";

const CoursePaymentHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    course: "",
    status: "",
    method: "",
  });
  const [viewMode, setViewMode] = useState("table");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [totalSpent, setTotalSpent] = useState(0);

  // Mock data
  useEffect(() => {
    const mockTransactions = [
      {
        id: "INV-2025-001",
        date: "2025-04-05",
        course: "Full Stack Dev Bootcamp",
        amount: 999,
        method: "UPI",
        status: "Success",
      },
      {
        id: "INV-2025-002",
        date: "2025-04-01",
        course: "DSA Masterclass",
        amount: 1499,
        method: "Card",
        status: "Success",
      },
      {
        id: "INV-2025-003",
        date: "2025-03-25",
        course: "UI/UX Design Fundamentals",
        amount: 799,
        method: "PayPal",
        status: "Success",
      },
      {
        id: "INV-2025-004",
        date: "2025-03-15",
        course: "AI & Machine Learning",
        amount: 1999,
        method: "Card",
        status: "Refunded",
      },
      {
        id: "INV-2025-005",
        date: "2025-03-10",
        course: "Python for Beginners",
        amount: 499,
        method: "UPI",
        status: "Success",
      },
      {
        id: "INV-2025-006",
        date: "2025-03-05",
        course: "Cybersecurity Essentials",
        amount: 1299,
        method: "PayPal",
        status: "Failed",
      },
      {
        id: "INV-2025-007",
        date: "2025-02-28",
        course: "Mobile App Development",
        amount: 1799,
        method: "Card",
        status: "Success",
      },
      {
        id: "INV-2025-008",
        date: "2025-02-20",
        course: "Cloud Computing Certification",
        amount: 2499,
        method: "UPI",
        status: "Success",
      },
      {
        id: "INV-2025-009",
        date: "2025-02-15",
        course: "Web Development Masterclass",
        amount: 899,
        method: "Card",
        status: "Success",
      },
      {
        id: "INV-2025-010",
        date: "2025-02-10",
        course: "Data Science Bootcamp",
        amount: 1999,
        method: "PayPal",
        status: "Success",
      },
    ];

    setTransactions(mockTransactions);
    setFilteredTransactions(mockTransactions);

    // Calculate total spent (excluding refunded and failed payments)
    const total = mockTransactions
      .filter((t) => t.status === "Success")
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    setTotalSpent(total);
  }, []);

  // Search and filter logic
  useEffect(() => {
    let results = [...transactions];

    if (searchQuery) {
      results = results.filter(
        (item) =>
          item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.course.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (startDate && endDate) {
      results = results.filter((item) => {
        const itemDate = new Date(item.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setDate(end.getDate() + 1); // Include the end date
        return itemDate >= start && itemDate < end;
      });
    }

    if (selectedFilters.course) {
      results = results.filter(
        (item) => item.course === selectedFilters.course
      );
    }

    if (selectedFilters.status) {
      results = results.filter(
        (item) => item.status === selectedFilters.status
      );
    }

    if (selectedFilters.method) {
      results = results.filter(
        (item) => item.method === selectedFilters.method
      );
    }

    // Sorting
    results.sort((a, b) => {
      if (sortConfig.key === "date") {
        return sortConfig.direction === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      } else if (sortConfig.key === "amount") {
        return sortConfig.direction === "asc"
          ? a.amount - b.amount
          : b.amount - a.amount;
      }
      return 0;
    });

    setFilteredTransactions(results);
  }, [
    searchQuery,
    transactions,
    startDate,
    endDate,
    selectedFilters,
    sortConfig,
  ]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleViewInvoice = (transaction) => {
    setSelectedInvoice(transaction);
    setModalOpen(true);
  };

  const handleRefresh = () => {
    // Animation would happen via CSS
    document.querySelector(".refresh-icon").classList.add("spinning");
    setTimeout(() => {
      document.querySelector(".refresh-icon").classList.remove("spinning");
    }, 1000);
    // In a real app, you would fetch fresh data here
  };

  const handleDownloadReport = (format) => {
    // This would handle the actual download in a real app
    alert(`Downloading ${format} report...`);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Success":
        return "status-success";
      case "Failed":
        return "status-failed";
      case "Refunded":
        return "status-refunded";
      default:
        return "";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Success":
        return "✅";
      case "Failed":
        return "❌";
      case "Refunded":
        return "↩️";
      default:
        return "";
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get unique values for filters
  const uniqueCourses = [...new Set(transactions.map((t) => t.course))];
  const uniqueStatuses = [...new Set(transactions.map((t) => t.status))];
  const uniqueMethods = [...new Set(transactions.map((t) => t.method))];

  return (
    <div className="payment-history-container">
      {/* Top Navigation Bar */}
      <div className="topnav-container">
        <div className="search-container">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by Invoice ID / Course Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="date-range-container">
          <div className="date-input-group">
            <CalendarIcon className="calendar-icon" />
            <input
              type="date"
              className="date-input"
              placeholder="From"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <span className="date-separator">→</span>
          <div className="date-input-group">
            <input
              type="date"
              className="date-input"
              placeholder="To"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-container">
          <button
            className="filter-button"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter className="filter-icon" />
            Filter
            {filterOpen ? (
              <ChevronUp className="chevron-icon" />
            ) : (
              <ChevronDown className="chevron-icon" />
            )}
          </button>

          {filterOpen && (
            <div className="filter-dropdown fadeInDown">
              <div className="filter-group">
                <label>Course Name</label>
                <select
                  value={selectedFilters.course}
                  onChange={(e) =>
                    setSelectedFilters({
                      ...selectedFilters,
                      course: e.target.value,
                    })
                  }
                >
                  <option value="">All Courses</option>
                  {uniqueCourses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Payment Status</label>
                <select
                  value={selectedFilters.status}
                  onChange={(e) =>
                    setSelectedFilters({
                      ...selectedFilters,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="">All Statuses</option>
                  {uniqueStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Payment Method</label>
                <select
                  value={selectedFilters.method}
                  onChange={(e) =>
                    setSelectedFilters({
                      ...selectedFilters,
                      method: e.target.value,
                    })
                  }
                >
                  <option value="">All Methods</option>
                  {uniqueMethods.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="clear-filters-button"
                onClick={() =>
                  setSelectedFilters({ course: "", status: "", method: "" })
                }
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        <div className="actions-container">
          <div className="download-container">
            <button className="download-button">
              <DownloadIcon className="download-icon" />
              Download Report
              <ChevronDown className="chevron-icon" />
            </button>
            <div className="download-dropdown">
              <button onClick={() => handleDownloadReport("PDF")}>PDF</button>
              <button onClick={() => handleDownloadReport("CSV")}>CSV</button>
            </div>
          </div>

          <button className="refresh-button" onClick={handleRefresh}>
            <RefreshCw className="refresh-icon" />
            Refresh
          </button>

          <div className="view-toggle">
            <button
              className={`view-toggle-button ${
                viewMode === "table" ? "active" : ""
              }`}
              onClick={() => setViewMode("table")}
            >
              Table
            </button>
            <button
              className={`view-toggle-button ${
                viewMode === "cards" ? "active" : ""
              }`}
              onClick={() => setViewMode("cards")}
            >
              Cards
            </button>
          </div>
        </div>
      </div>

      {/* Total Spent Indicator */}
      <div className="total-spent-container">
        <div className="total-spent">
          <span className="total-spent-label">Total Spent:</span>
          <span className="total-spent-amount">
            ₹{totalSpent.toLocaleString()}
          </span>
          <span className="total-spent-suffix">so far</span>
        </div>
      </div>

      {/* Main Transaction Area */}
      <div className="transactions-container">
        {viewMode === "table" ? (
          <div className="table-container">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Course Name</th>
                  <th className="sortable" onClick={() => handleSort("amount")}>
                    Amount (₹)
                    {sortConfig.key === "amount" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="sort-icon" />
                      ) : (
                        <ChevronDown className="sort-icon" />
                      ))}
                  </th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Invoice</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="table-row">
                    <td>{formatDate(transaction.date)}</td>
                    <td>{transaction.course}</td>
                    <td className="amount-cell">
                      ₹{transaction.amount.toLocaleString()}
                    </td>
                    <td>
                      <span
                        className={`method-badge method-${transaction.method.toLowerCase()}`}
                      >
                        {transaction.method}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${getStatusClass(
                          transaction.status
                        )}`}
                      >
                        {getStatusIcon(transaction.status)} {transaction.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="view-invoice-button"
                        onClick={() => handleViewInvoice(transaction)}
                      >
                        <FileText className="invoice-icon" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="cards-container">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="transaction-card">
                <div className="card-header">
                  <div className="card-date">
                    {formatDate(transaction.date)}
                  </div>
                  <span
                    className={`status-badge ${getStatusClass(
                      transaction.status
                    )}`}
                  >
                    {getStatusIcon(transaction.status)} {transaction.status}
                  </span>
                </div>

                <div className="card-course">{transaction.course}</div>

                <div className="card-details">
                  <div className="card-amount">
                    ₹{transaction.amount.toLocaleString()}
                  </div>
                  <div
                    className={`method-badge method-${transaction.method.toLowerCase()}`}
                  >
                    {transaction.method}
                  </div>
                </div>

                <div className="card-actions">
                  <button
                    className="card-invoice-button"
                    onClick={() => handleViewInvoice(transaction)}
                  >
                    <FileText className="invoice-icon" />
                    View Invoice
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Invoice Modal */}
      {modalOpen && selectedInvoice && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="invoice-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Invoice Details</h2>
              <button
                className="close-modal"
                onClick={() => setModalOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="invoice-content">
              <div className="invoice-grid">
                <div className="invoice-item">
                  <span className="invoice-label">Invoice ID:</span>
                  <span className="invoice-value">{selectedInvoice.id}</span>
                </div>

                <div className="invoice-item">
                  <span className="invoice-label">Date:</span>
                  <span className="invoice-value">
                    {formatDate(selectedInvoice.date)}
                  </span>
                </div>

                <div className="invoice-item">
                  <span className="invoice-label">Course:</span>
                  <span className="invoice-value">
                    {selectedInvoice.course}
                  </span>
                </div>

                <div className="invoice-item">
                  <span className="invoice-label">Payment Method:</span>
                  <span className="invoice-value">
                    {selectedInvoice.method}
                  </span>
                </div>

                <div className="invoice-item">
                  <span className="invoice-label">Status:</span>
                  <span
                    className={`invoice-value status-text ${getStatusClass(
                      selectedInvoice.status
                    )}`}
                  >
                    {selectedInvoice.status}
                  </span>
                </div>

                <div className="invoice-item">
                  <span className="invoice-label">Amount:</span>
                  <span className="invoice-value invoice-amount">
                    ₹{selectedInvoice.amount.toLocaleString()}
                  </span>
                </div>

                <div className="invoice-item full-width">
                  <span className="invoice-label">Billed To:</span>
                  <div className="invoice-address">
                    <p>John Doe</p>
                    <p>john.doe@example.com</p>
                    <p>+91 98765 43210</p>
                  </div>
                </div>
              </div>

              <div className="invoice-actions">
                <button className="invoice-download-button">
                  <DownloadIcon className="button-icon" />
                  Download PDF
                </button>

                <button className="invoice-print-button">
                  <span className="button-icon">🖨️</span>
                  Print Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No Results Message */}
      {filteredTransactions.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h3>No Transactions Found</h3>
          <p>Try changing your search criteria or filters</p>
          <button
            className="clear-all-button"
            onClick={() => {
              setSearchQuery("");
              setStartDate("");
              setEndDate("");
              setSelectedFilters({ course: "", status: "", method: "" });
            }}
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default CoursePaymentHistory;

// Sample user data
let user;

function register() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var address = document.getElementById("address").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var postode = document.getElementById("postode").value;
    var country = document.getElementById("country").value;

    // Validate form fields
    if (!firstName || !lastName || !password || !email || !phone || !address || !city || !state || !postode || !country) {
        document.getElementById("registrationMessage").innerText = "All fields are required.";
        return;
    }

    // Validate email using a simple pattern
    // Validate email using a standard pattern
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById("registrationMessage").innerText = "Please enter a valid email address.";
        return;
    }
    
    // Assuming a 10-digit phone number
    var phoneRegex = /^\d{10}$/; 
    if (!phone.match(phoneRegex)) {
        document.getElementById("registrationMessage").innerText = "Please enter a valid phone number.";
        return;
    }

    // Add your registration logic here
    // For simplicity, just display a success message
    var successMessage = "Registration successful! Welcome, " + firstName + " " + lastName + ".";
    document.getElementById("registrationMessage").innerText = successMessage;
    alert("Registration successful!");
}

const books = [
    { id: 1, title: "Fahrenheit 451", category: "fiction", price: 20, image: "image/book1.jpg" },
    { id: 2, title: "Carmilla", category: "fiction", price: 30, image: "image/book2.jpg" },
    { id: 3, title: "The Great Gatsby", category: "fiction", price: 30, image: "image/book3.jpg" },
    { id: 4, title: "Blue Lock 1", category: "comic", price: 25, image: "image/book4.jpg" },
    { id: 5, title: "Haikyu!!, Vol. 1", category: "comic", price: 30, image: "image/book5.jpg" },
    { id: 6, title: "Blue Lock 2", category: "comic", price: 30, image: "image/book6.jpg" },
    { id: 7, title: "The Napping House", category: "bedtime-reading", price: 20.00, image: "image/book7.jpg" },
    { id: 8, title: "The Going to Bed Book", category: "bedtime-reading", price: 15.00, image: "image/book8.jpg" },
    { id: 9, title: "Bluey: Sleepytime", category: "bedtime-reading", price: 20.00, image: "image/book9.jpg" },
    { id: 10, title: "Pajama Time!", category: "bedtime-reading", price: 45.09, image: "image/book10.jpg" },
    { id: 11, title: "I'll Love You Till the Cows Come Home Board Book", category: "bedtime-reading", price: 62.01, image: "image/book11.jpg" },

    // Add more books as needed
];

function generateBookList() {
    const bookListContainer = document.getElementById("book-list");
    const selectedCategory = document.getElementById("category").value;

    bookListContainer.innerHTML = "";
    const filteredBooks = selectedCategory === "all" ?
        books : books.filter(book => book.category === selectedCategory);

    filteredBooks.forEach(book => {
        const bookElement = document.createElement("div");
        bookElement.className = "book";
        bookElement.innerHTML = `<img src="${book.image}" alt="${book.title}">
                                 <p>${book.title}</p>
                                 <p>RM ${book.price.toFixed(2)}</p>
                                 <button onclick="addToOrder(${book.id})">Add to Order</button>`;
        bookListContainer.appendChild(bookElement);
    });
}

function addToOrder(bookId) {
    const book = books.find(b => b.id === bookId);
    const summaryList = document.getElementById("summary-list");
    const listItem = document.createElement("li");
    listItem.innerHTML = `<img src="${book.image}" alt="${book.title}" style="max-width: 50px; border-radius: 4px;">
                          <span>${book.title} - RM ${book.price.toFixed(2)}</span>
                          <button class="delete-button" onclick="deleteBook(${book.id})">Delete</button>`;
    summaryList.appendChild(listItem);

    updateOrderSummary();
}

function deleteBook(bookId) {
    const summaryList = document.getElementById("summary-list");
    const itemToDelete = Array.from(summaryList.children).find(item => {
        const id = parseInt(item.querySelector('button').getAttribute('onclick').match(/\d+/)[0]);
        return id === bookId;
    });

    summaryList.removeChild(itemToDelete);
    updateOrderSummary();
}

function updateOrderSummary() {
    const summaryList = document.getElementById("summary-list");
    const totalPriceElement = document.getElementById("total-price");
    const discountElement = document.getElementById("discount");
    const postageFeeElement = document.getElementById("postage-fee");
    const finalPriceElement = document.getElementById("final-price");

    const totalItems = summaryList.children.length;
    const totalPrice = Array.from(summaryList.children).reduce((acc, listItem) => {
        const price = parseFloat(listItem.textContent.split("RM")[1]);
        return acc + price;
    }, 0);

    let discount = 0;
    if (totalItems >= 5 && totalItems <= 10) {
        discount = 5;
    } else if (totalItems > 10) {
        discount = 15;
    }

    let postageFee = totalPrice < 100 ? 10 : 0;
    const discountedPrice = totalPrice - (totalPrice * (discount / 100));
    const finalPrice = discountedPrice + postageFee;

    totalPriceElement.textContent = totalPrice.toFixed(2);
    discountElement.textContent = discount + "%";
    postageFeeElement.textContent = postageFee.toFixed(2);
    finalPriceElement.textContent = finalPrice.toFixed(2);
}

function submitOrder() {
    const orderSummary = document.getElementById("order-summary").outerHTML;
    const newWindow = window.open('', '_blank');
    newWindow.document.write('<html><head><title>Order Summary</title></head><body>');
    newWindow.document.write(orderSummary);
    newWindow.document.write('</body></html>');
    newWindow.document.close();
    newWindow.print();
}

generateBookList();
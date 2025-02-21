// Nav-bar And Footer
async function loadComponents() {
    try {
        const response = await fetch('navbar-footer.html');
        const html = await response.text();
        
        document.getElementById('the-navbar').innerHTML = html.match(/<nav[\s\S]*?<\/nav>/)[0];
        document.getElementById('the-footer').innerHTML = html.match(/<footer[\s\S]*?<\/footer>/)[0];
    } catch (error) {
        console.error('Error loading components:', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    loadComponents();

    const bookingButton = document.querySelector('.Booking-button');
    const bookingDiv = document.querySelector('.Booking');

    bookingButton.addEventListener('click', function () {
        bookingDiv.innerHTML = `
            <div class="row" style="height:38px;" >
                <div class="col-md-4">
                    <button id="decrease" class="border-0 bg-danger text-white fw-bold rounded-3 w-100">-</button>
                </div>
                <div class="col-md-4 text-center text-white">
                    <span id="booking-count">1</span>
                </div>
                <div class="col-md-4">
                    <button id="increase" class="border-0 bg-danger text-white fw-bold rounded-3 w-100">+</button>
                </div>
            </div>
        `;

        let count = 1;
        const bookingCount = document.getElementById('booking-count');
        document.getElementById('increase').addEventListener('click', function () {
            count++;
            bookingCount.textContent = count;
        });

        document.getElementById('decrease').addEventListener('click', function () {
            if (count > 1) {
                count--;
                bookingCount.textContent = count;
            }
        });
    });

    function calculateTotal() {
        var count = parseInt(document.getElementById('booking-count').textContent);
        var amountPerPerson = 7000; //  per person is ₹7,000
        var totalAmount = count * amountPerPerson;

        // Store the total amount 
        localStorage.setItem('totalAmount', totalAmount);
        localStorage.setItem('totalPerson', count);

        // Redirect to payment.html
        window.location.href = 'payment.html';
    }

    document.getElementById('payment-button').addEventListener('click', calculateTotal);
});


document.addEventListener('DOMContentLoaded', function () {
    var totalAmount = localStorage.getItem('totalAmount');
    var totalPerson = localStorage.getItem('totalPerson')

    document.getElementById('total-amount').textContent = totalAmount;
    document.getElementById('total-person').textContent = totalPerson;
}); 
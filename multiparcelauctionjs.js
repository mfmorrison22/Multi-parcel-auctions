// Array to store all parcels
let parcels = [];

document.getElementById('parcelForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get parcel details from form
    const parcelName = document.getElementById('parcelName').value;
    const startingPrice = parseFloat(document.getElementById('startingPrice').value);

    // Create a new parcel object
    const newParcel = {
        name: parcelName,
        price: startingPrice,
        highBidder: 'No bids yet'
    };

    // Add parcel to the array
    parcels.push(newParcel);

    // Reset form fields
    document.getElementById('parcelForm').reset();

    // Update the table
    updateParcelTable();
});

function updateParcelTable() {
    const parcelTableBody = document.querySelector('#parcelTable tbody');
    parcelTableBody.innerHTML = ''; // Clear the table body

    // Loop through the parcels and create a table row for each
    parcels.forEach((parcel, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${parcel.name}</td>
            <td>$${parcel.price.toFixed(2)}</td>
            <td>${parcel.highBidder}</td>
            <td>
                <form class="bid-form" data-index="${index}">
                    <input type="number" placeholder="Bid Amount" required>
                    <input type="text" placeholder="Bidder Name" required>
                    <button type="submit">Place Bid</button>
                </form>
            </td>
        `;

        parcelTableBody.appendChild(row);
    });

    // Attach event listeners to each bid form
    const bidForms = document.querySelectorAll('.bid-form');
    bidForms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            // Get the index of the parcel and new bid details
            const parcelIndex = this.dataset.index;
            const bidAmount = parseFloat(this.querySelector('input[type="number"]').value);
            const bidderName = this.querySelector('input[type="text"]').value;

            // Update the parcel with the highest bid
            if (bidAmount > parcels[parcelIndex].price) {
                parcels[parcelIndex].price = bidAmount;
                parcels[parcelIndex].highBidder = bidderName;
                updateParcelTable(); // Update the table
            } else {
                alert("Bid must be higher than the current price.");
            }

            // Reset the form fields
            this.reset();
        });
    });
}

